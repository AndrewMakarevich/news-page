import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {
  IActivateUserParams,
  IAddUserParams,
  IGetOneUserParams,
} from './users.repository.interface';
import { Users, Roles, Permissions } from 'src/db/models/models';
import { FindOptions } from 'sequelize';
import { IUsersModelAttributes } from '../model/user.model.interface';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(Users) private UsersModel: typeof Users) {}

  addUser({ username, email, password, transaction }: IAddUserParams) {
    return this.UsersModel.create(
      { username, email, password },
      { transaction, returning: true },
    );
  }

  /**
   @If no parameters passed search will be executed with userId=0
   @advancedOptions overrides default configuration
   */
  getOneUser({ userId, advancedOptions }: IGetOneUserParams) {
    const defaultFindOptions: FindOptions<IUsersModelAttributes> = {
      where: { id: userId || 0 },
      include: [{ model: Roles, include: [{ model: Permissions }] }],
    };
    const findOptions = advancedOptions ? advancedOptions : defaultFindOptions;

    return this.UsersModel.findOne(findOptions);
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
