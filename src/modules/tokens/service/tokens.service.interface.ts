import { Users } from 'src/db/models/models';

export interface IGenerateTokensPairParams {
  user: Users;
}

interface IGenerateTokenParams {
  payload: {
    id: string;
    username: string;
    roleId: string;
  };
}

export type IGenerateAccessTokenParams = IGenerateTokenParams;
export type IGenerateRefreshTokenParams = IGenerateTokenParams;
