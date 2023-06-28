import { BadRequestException, Injectable } from '@nestjs/common';

import { UsersRepository as UsersRepositoryClass } from '../repository/users.repository';
import {
  ICheckUserHealthParams,
  IGetOneUserParams,
} from './users.service.interface';

@Injectable()
export class UsersService {
  constructor(private UsersRepository: UsersRepositoryClass) {}

  getOneUser({ userId }: IGetOneUserParams) {
    return this.UsersRepository.getOneUser({ userId });
  }

  checkUserHealth({ user, errorMessages }: ICheckUserHealthParams) {
    const {
      userIsNull: userIsNullMessage = "User doesn't exists",
      userIsNotActivated: userIsNotActivatedMessage = 'User not activated',
      userIsBlocked: userIsBlockedMessage = 'User blocked',
    } = errorMessages || {};

    if (!user) {
      throw new BadRequestException(userIsNullMessage);
    }

    if (!user.isActivated) {
      throw new BadRequestException(userIsNotActivatedMessage);
    }

    if (user.isBlocked) {
      throw new BadRequestException(userIsBlockedMessage);
    }

    return user;
  }
}
