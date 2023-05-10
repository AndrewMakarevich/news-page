import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService as AuthServiceClass } from '../service/auth.service';
import { RegisterDto } from '../auth.dto';
import { Sequelize } from 'sequelize-typescript';

@Controller('auth')
export class AuthController {
  constructor(
    private sequelize: Sequelize,
    private AuthService: AuthServiceClass,
  ) {}

  @Post('register')
  async register(@Body() { username, email, password }: RegisterDto) {
    const transaction = await this.sequelize.transaction();

    try {
      const response = await this.AuthService.register({
        username,
        email,
        password,
        transaction,
      });

      await transaction.commit();

      return response;
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  }
}
