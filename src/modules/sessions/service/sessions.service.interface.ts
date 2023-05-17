import { Transaction } from 'sequelize';

export type IUpdateOrAddSession = IAddSession;

export interface IAddSession {
  userId: string;
  userIp: string;
  refreshToken: string;
  transaction: Transaction;
}

export interface IEditSessionParams {
  sessionId: string;
  refreshToken: string;
  transaction: Transaction;
}

export interface IDeleteExtraSessions {
  userId: string;
  reserve: number;
  transaction: Transaction;
}
