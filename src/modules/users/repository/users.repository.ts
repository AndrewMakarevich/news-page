import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from '../model/users.model';
import {
  IActivateUserParams,
  IAddUserParams,
} from './users.repository.interface';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(Users) private UsersModel: typeof Users) {}

  addUser({ username, email, password, transaction }: IAddUserParams) {
    return this.UsersModel.create(
      { username, email, password },
      { transaction, returning: true },
    );
  }

  async activateUser({ activationToken }: IActivateUserParams) {
    const activationRes = await this.UsersModel.update(
      { isActivated: true },
      { where: { activationToken } },
    );

    if (activationRes[0] === 0) {
      throw new HttpException(
        "User doesn't exists or already activated",
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
