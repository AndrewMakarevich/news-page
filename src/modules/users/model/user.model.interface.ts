import { IDefaultModelAttributes } from 'src/db/models/models.interface';

export interface IUserModelCreationAttributes {
  username: string;
  email: string;
  password: string;
}

export interface IUserModelAttributes
  extends IDefaultModelAttributes,
    IUserModelCreationAttributes {
  isBlocked: boolean;
}
