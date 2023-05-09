import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from '../model/users.model';
import { IAddUser } from './users.repository.interface';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(Users) private UsersModel: typeof Users) {}

  addUser({ username, email, password, transaction }: IAddUser) {
    return this.UsersModel.create(
      { username, email, password },
      { transaction },
    );
  }
}
