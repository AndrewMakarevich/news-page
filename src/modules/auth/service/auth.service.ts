import { Injectable } from '@nestjs/common';
import { UsersRepository as UsersRepositoryClass } from 'src/modules/users/repository/users.repository';
import { IRegistrate } from './auth.service.interface';
import { hash } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private UsersRepository: UsersRepositoryClass) {}

  async registrate({ username, email, password, transaction }: IRegistrate) {
    const hashedPassword = await hash(password, 12);

    return await this.UsersRepository.addUser({
      username,
      email,
      password: hashedPassword,
      transaction,
    });
  }
}
