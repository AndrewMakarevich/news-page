import { Transaction } from 'sequelize';

export interface IAddOrRefreshSessionParams
  extends IAddSessionParams,
    IRefreshSessionParams {}

export interface IAddSessionParams {
  userId: string;
  userIp: string | null;
  transaction: Transaction;
}

export interface IRefreshSessionParams {
  userId: string;
  userIp: string | null;
  currentRefreshToken: string;
  transaction: Transaction;
}

export interface IDeleteExtraSessionsParams {
  userId: string;
  reserve: number;
  transaction: Transaction;
}

export interface IGetUserCanHaveSession {
  userId: string;
  sessionInteractionType: 'create' | 'refresh';
}
