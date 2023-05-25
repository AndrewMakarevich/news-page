import { FindOptions, Transaction, UpdateOptions } from 'sequelize';
import {
  ISessionsModelAttributes,
  ISessionsModelCreationAttributes,
} from '../model/sessions.model.interface';

export interface IAddSessionParams {
  userId: string;
  userIp: string | null;
  refreshTokenSignature: string;
  transaction: Transaction;
}

export interface IGetOneSessionsParams {
  sessionId?: string;
  advancedOptions?: FindOptions<ISessionsModelAttributes>;
}

export interface IGetSessionsParams {
  userId?: string;
  advancedOptions?: FindOptions<ISessionsModelAttributes>;
}

export interface IEditSessionParams {
  sessionId?: string;
  refreshTokenSignature?: string;
  advancedOptions?: {
    values: Partial<ISessionsModelCreationAttributes>;
    options: UpdateOptions<ISessionsModelAttributes>;
  };
  transaction: Transaction;
}

export interface IDeleteSessionsParams {
  sessionsIds?: string[];
  advancedOptions?: FindOptions<ISessionsModelAttributes>;
  transaction: Transaction;
}
