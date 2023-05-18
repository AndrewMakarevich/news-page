import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repository/users.repository';
import { IGetOneUserParams } from './users.service.spec';

@Injectable()
export class UsersService {
  constructor(private UsersRepository: UsersRepository) {}

  getOneUser({ userId }: IGetOneUserParams) {
    return this.UsersRepository.getOneUser({ userId });
  }
}
