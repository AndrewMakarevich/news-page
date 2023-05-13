import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { env } from 'process';
import {
  IGenerateAccessTokenParams,
  IGenerateRefreshTokenParams,
  IGenerateTokensPairParams,
} from './tokens.service.interface';

@Injectable()
export class TokensService {
  generateTokensPair({ user }: IGenerateTokensPairParams) {
    const accessToken = this.generateAccessToken({ payload: user });
    const refreshToken = this.generateRefreshToken({ payload: user });

    return { accessToken, refreshToken };
  }

  generateAccessToken({ payload }: IGenerateAccessTokenParams) {
    const { id, username, roleId } = payload;
    jwt.sign({ id, username, roleId }, env.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: '15m',
    });
  }

  generateRefreshToken({ payload }: IGenerateRefreshTokenParams) {
    const { id, username, roleId } = payload;
    jwt.sign({ id, username, roleId }, env.REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: '30d',
    });
  }
}
