import { Transaction } from 'sequelize';

export interface IRegisterParams {
  username: string;
  email: string;
  password: string;
  transaction: Transaction;
}

export interface INotifyAfterRegisterParams {
  username: string;
  email: string;
  activationToken: string;
}

export interface IGetUserActivationLinkParams {
  activationToken: string;
}
