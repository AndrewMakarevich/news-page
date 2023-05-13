import { FindOptions, Transaction } from 'sequelize';
import { IUsersModelAttributes } from '../model/user.model.interface';

export interface IAddUserParams {
  username: string;
  email: string;
  password: string;
  transaction: Transaction;
}

export interface IGetOneUserParams {
  userId?: string;
  advancedOptions?: FindOptions<IUsersModelAttributes>;
}

export interface IActivateUserParams {
  activationToken: string;
}
