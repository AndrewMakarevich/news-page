import { Injectable, UnauthorizedException } from '@nestjs/common';
import { sign, verify } from 'jsonwebtoken';
import { env } from 'process';
import {
  IAddAccessTokenToBlackList,
  IGenerateAccessTokenParams,
  IGenerateRefreshTokenParams,
  IGenerateTokensPairParams,
  IGetTokenSignature,
  ITokenPayload,
  IVerifyAccessTokenParams,
  IVerifyRefreshTokenParams,
  IVerifyTokenParams,
} from './tokens.service.interface';
import { RedisRepository as RedisRepositoryClass } from 'src/modules/redis/repository/redis.repository';

@Injectable()
export class TokensService {
  constructor(private RedisRepository: RedisRepositoryClass) {}

  async addAccessTokenToBlackList({
    token,
    tokenExp,
  }: IAddAccessTokenToBlackList) {
    let tokenTtl = Date.now() - tokenExp;

    if (tokenTtl <= 0) {
      return;
    }

    if (tokenTtl > ACCESS_TOKEN_EXPIRES_IN_SECONDS) {
      tokenTtl = ACCESS_TOKEN_EXPIRES_IN_SECONDS;
    }

    const tokenSignature = this.getTokenSignature({ token });

    return this.RedisRepository.SET(`bl_${tokenSignature}`, '', {
      EX: tokenTtl,
    });
  }

  generateTokensPair({ user }: IGenerateTokensPairParams) {
    const accessToken = this.generateAccessToken({ payload: user });
    const refreshToken = this.generateRefreshToken({ payload: user });

    return { accessToken, refreshToken };
  }

  generateAccessToken({ payload }: IGenerateAccessTokenParams) {
    const { id, username, roleId } = payload;

    return sign({ id, username, roleId }, env.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: `${ACCESS_TOKEN_EXPIRES_IN_SECONDS}s`,
    });
  }

  generateRefreshToken({ payload }: IGenerateRefreshTokenParams) {
    const { id, username, roleId } = payload;

    return sign({ id, username, roleId }, env.REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: `${REFRESH_TOKEN_EXPIRES_IN_SECONDS}s`,
    });
  }

  getTokenSignature({ token }: IGetTokenSignature) {
    return token.split('.')[2];
  }

  private verifyToken({ token, secret, errorMessage }: IVerifyTokenParams) {
    try {
      return verify(token, secret) as ITokenPayload;
    } catch (err) {
      throw new UnauthorizedException(
        `${errorMessage}. Details: ${err?.message}`,
      );
    }
  }

  verifyAccessToken({ token }: IVerifyAccessTokenParams) {
    return this.verifyToken({
      token,
      secret: env.ACCESS_TOKEN_SECRET_KEY,
      errorMessage: 'Incorrect access token',
    });
  }

  verifyRefreshToken({ token }: IVerifyRefreshTokenParams) {
    return this.verifyToken({
      token,
      secret: env.REFRESH_TOKEN_SECRET_KEY,
      errorMessage: 'Incorrect refresh token',
    });
  }
}
