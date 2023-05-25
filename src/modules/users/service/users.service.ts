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
      userIsNull: userIsNullMessage,
      userIsNotActivated: userIsNotActivatedMessage,
      userIsBlocked: userIsBlockedMessage,
    } = errorMessages || {};

    if (!user) {
      throw new BadRequestException(userIsNullMessage || "User doesn't exists");
    }

    if (!user.isActivated) {
      throw new BadRequestException(
        userIsNotActivatedMessage || 'User not activated',
      );
    }

    if (user.isBlocked) {
      throw new BadRequestException(userIsBlockedMessage || 'User blocked');
    }

    return user;
  }
}
