import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from '../model/users.model';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(Users) private UsersModel: Users) {}
}
