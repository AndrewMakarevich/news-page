import { Transaction } from 'sequelize';

export interface IRegistrate {
  username: string;
  email: string;
  password: string;
  transaction: Transaction;
}
