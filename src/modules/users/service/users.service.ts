import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../repository/users.repository';

@Injectable()
export class UsersService {
  constructor(private UsersRepository: UsersRepository) {}
}
