import { Transaction } from 'sequelize';

export interface IAddUserParams {
  username: string;
  email: string;
  password: string;
  transaction: Transaction;
}

export interface IActivateUserParams {
  activationToken: string;
}
