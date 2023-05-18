import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokensService } from 'src/modules/tokens/service/tokens.service';
import { UsersService as UsersServiceClass } from 'src/modules/users/service/users.service';

export class AuthGuard implements CanActivate {
  constructor(
    private TokensService: TokensService,
    private UsersService: UsersServiceClass,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const ctx = context.switchToHttp();
      const request = ctx.getRequest<Request>();
      const accessToken = request.headers.authorization?.split('Bearer ')[1];

      if (!accessToken) {
        throw new UnauthorizedException('User is unauthorized');
      }

      const accessTokenPayload = this.TokensService.verifyAccessToken({
        token: accessToken,
      });

      const user = await this.UsersService.getOneUser({
        userId: accessTokenPayload.id,
      });

      if (!user) {
        throw new UnauthorizedException(
          "User of these access token doesn't exists",
        );
      }

      request.user = user;

      return true;
    } catch (err) {
      if (err instanceof UnauthorizedException) throw err;

      throw new UnauthorizedException(err?.message);
    }
  }
}
