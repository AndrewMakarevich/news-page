import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Res,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Response } from 'express';
import { AuthService as AuthServiceClass } from '../service/auth.service';
import { ActivateDto, LoginDto, RegisterDto } from '../auth.dto';
import { REFRESH_TOKEN_COOKIE_NAME } from '../auth.const';
import { ParseJWTPipe } from 'src/pipes/parseJWT/parseJWT.pipe';
import { AccessToken } from 'src/decorators/param/request/accessToken/accessToken.decorator';
import { UserIp } from 'src/decorators/param/request/userIp/userIp.decorator';
import { Cookies } from 'src/decorators/param/request/cookies/cookies.decorator';
import { AccessTokenGuard } from 'src/guards/accessToken/accessToken.guard';
import { AccessTokenPayload } from 'src/decorators/param/request/accessTokenPayload/accessTokenPayload.decorator';

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

  @Get('activate/:activationToken')
  async activate(@Param() { activationToken }: ActivateDto) {
    const transaction = await this.sequelize.transaction();

    try {
      await this.AuthService.activate({
        activationToken,
        transaction,
      });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  }

  @Post('login')
  async login(
    @Body() { username, password }: LoginDto,
    @UserIp() userIp: string | null,
    @Res({ passthrough: true }) res: Response,
  ) {
    const transaction = await this.sequelize.transaction();

    try {
      const { accessToken, refreshToken } = await this.AuthService.login({
        userIp,
        username,
        password,
        transaction,
      });

      await transaction.commit();

      res.cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, { httpOnly: true });

      return { accessToken };
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  }

  @UseGuards(AccessTokenGuard)
  @Delete('logout')
  async logout(
    @Cookies(REFRESH_TOKEN_COOKIE_NAME, new ParseJWTPipe('refresh'))
    refreshToken: string,
    @AccessToken(new ParseJWTPipe('access')) accessToken: string,
    @AccessTokenPayload('exp', ParseIntPipe) accessTokenExp: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    const transaction = await this.sequelize.transaction();

    try {
      const logoutResult = await this.AuthService.logout({
        accessToken,
        accessTokenExp,
        refreshToken,
        transaction,
      });
      res.clearCookie(REFRESH_TOKEN_COOKIE_NAME);

      return logoutResult;
    } catch (err) {
      await transaction.rollback();

      throw err;
    }
  }
}
