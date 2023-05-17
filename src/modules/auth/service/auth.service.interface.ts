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
  userIp: string;
  username: string;
  password: string;
  transaction: Transaction;
}

export interface INotifyAfterRegisterParams {
  username: string;
  email: string;
  activationToken: string;
}

export interface IComparePasswordsParams {
  plainPassword: string;
  hashedPassword: string;
}

export interface IGetUserActivationLinkParams {
  activationToken: string;
}

export interface IPepperisePasswordParams {
  password: string;
}
