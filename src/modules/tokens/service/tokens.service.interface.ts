import { Users } from 'src/db/models/models';

export interface ITokenPayload {
  id: string;
  username: string;
  roleId: string;
}

export interface IGenerateTokensPairParams {
  user: Users;
}

interface IGenerateTokenParams {
  payload: ITokenPayload;
}

export type IGenerateAccessTokenParams = IGenerateTokenParams;
export type IGenerateRefreshTokenParams = IGenerateTokenParams;

export interface IGetTokenSignature {
  token: string;
}

export interface IVerifyTokenParams {
  token: string;
  secret: string;
  errorMessage: string;
}

export interface IVerifyAccessTokenParams {
  token: string;
}

export interface IVerifyRefreshTokenParams {
  token: string;
}
