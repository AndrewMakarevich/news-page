import { Transaction } from 'sequelize';

export interface IRegisterParams {
  username: string;
  email: string;
  password: string;
  transaction: Transaction;
}

export interface IActivateParams {
  activationToken: string;
  transaction: Transaction;
}

export interface ILoginParams {
  username: string;
  password: string;
}

export interface INotifyAfterRegisterParams {
  username: string;
  email: string;
  activationToken: string;
}
