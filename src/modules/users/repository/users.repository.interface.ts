import { Transaction } from 'sequelize';

export interface IAddUser {
  username: string;
  email: string;
  password: string;
  transaction: Transaction;
}
