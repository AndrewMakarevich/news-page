import { Injectable, UnauthorizedException } from '@nestjs/common';
import { sign, decode, verify } from 'jsonwebtoken';
import { env } from 'process';
import {
  IAddAccessTokenToBlackListParams,
  IDecodeTokenParams,
  IGenerateAccessTokenParams,
  IGenerateRefreshTokenParams,
  IGenerateTokensPairParams,
  IGetAccessTokenFromBlackListParams,
  IGetTokenBlackListRedisKey,
  IGetTokenSignature,
  ITokenPayload,
  IVerifyAccessTokenParams,
  IVerifyRefreshTokenParams,
  IVerifyTokenParams,
} from './tokens.service.interface';
import { RedisRepository as RedisRepositoryClass } from 'src/modules/redis/repository/redis.repository';
import {
  ACCESS_TOKEN_EXPIRES_IN_SECONDS,
  REFRESH_TOKEN_EXPIRES_IN_SECONDS,
} from '../tokens.const';

@Injectable()
export class TokensService {
  constructor(private RedisRepository: RedisRepositoryClass) {}

  async addAccessTokenToBlackList({
    token,
    tokenExp,
  }: IAddAccessTokenToBlackListParams) {
    try {
      await this.verifyAccessToken({ token });
    } catch (err) {
      return;
    }

    let tokenTtl = tokenExp - Math.ceil(Date.now() / 1000);

    if (tokenTtl <= 0) {
      return;
    }

    if (tokenTtl > ACCESS_TOKEN_EXPIRES_IN_SECONDS) {
      tokenTtl = ACCESS_TOKEN_EXPIRES_IN_SECONDS;
    }

    const tokenBlackListKey = this.getTokenBlackListRedisKey({ token });

    return this.RedisRepository.SET(tokenBlackListKey, '', {
      EX: tokenTtl,
    });
  }

  async getAccessTokenFromBlacklist({
    token,
  }: IGetAccessTokenFromBlackListParams) {
    const tokenBlackListKey = this.getTokenBlackListRedisKey({ token });

    return this.RedisRepository.GET(tokenBlackListKey);
  }

  async verifyAccessToken({ token }: IVerifyAccessTokenParams) {
    const blackListedToken = await this.getAccessTokenFromBlacklist({ token });

    if (blackListedToken === '') {
      throw new UnauthorizedException('Token added to the black list');
    }

    return this.verifyToken({
      token,
      secret: env.ACCESS_TOKEN_SECRET_KEY!,
      errorMessage: 'Incorrect access token',
    });
  }

  verifyRefreshToken({ token }: IVerifyRefreshTokenParams) {
    return this.verifyToken({
      token,
      secret: env.REFRESH_TOKEN_SECRET_KEY!,
      errorMessage: 'Incorrect refresh token',
    });
  }

  decodeToken({ token }: IDecodeTokenParams) {
    try {
      return decode(token) as ITokenPayload;
    } catch (err) {
      throw new UnauthorizedException(
        `Error appeared while decoding token payload. Details: ${err?.message}`,
      );
    }
  }

  getTokenBlackListRedisKey({ token }: IGetTokenBlackListRedisKey) {
    const tokenSignature = this.getTokenSignature({ token });

    return `bl_${tokenSignature}`;
  }

  generateTokensPair({ user }: IGenerateTokensPairParams) {
    const accessToken = this.generateAccessToken({ payload: user });
    const refreshToken = this.generateRefreshToken({ payload: user });

    return { accessToken, refreshToken };
  }

  generateAccessToken({ payload }: IGenerateAccessTokenParams) {
    const { id, username, roleId } = payload;

    return sign({ id, username, roleId }, env.ACCESS_TOKEN_SECRET_KEY!, {
      expiresIn: `${ACCESS_TOKEN_EXPIRES_IN_SECONDS}s`,
    });
  }

  generateRefreshToken({ payload }: IGenerateRefreshTokenParams) {
    const { id, username, roleId } = payload;

    return sign({ id, username, roleId }, env.REFRESH_TOKEN_SECRET_KEY!, {
      expiresIn: `${REFRESH_TOKEN_EXPIRES_IN_SECONDS}s`,
    });
  }

  getTokenSignature({ token }: IGetTokenSignature) {
    return token.split('.')[2];
  }

  private async verifyToken({
    token,
    secret,
    errorMessage,
  }: IVerifyTokenParams) {
    try {
      return verify(token, secret) as ITokenPayload;
    } catch (err) {
      throw new UnauthorizedException(
        `${errorMessage}. Details: ${err?.message}`,
      );
    }
  }
}
