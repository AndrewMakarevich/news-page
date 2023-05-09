import { Controller, Post, Body } from '@nestjs/common';
import { AuthService as AuthServiceClass } from '../service/auth.service';
import { RegistrateDto } from '../auth.dto';
import { Sequelize } from 'sequelize-typescript';

@Controller('auth')
export class AuthController {
  constructor(
    private sequelize: Sequelize,
    private AuthService: AuthServiceClass,
  ) {}

  @Post('registrate')
  async registrate(@Body() registrateDto: RegistrateDto) {
    const transaction = await this.sequelize.transaction();

    try {
      const { username, email, password } = registrateDto;
      const response = await this.AuthService.registrate({
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
