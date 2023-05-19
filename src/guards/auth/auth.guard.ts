import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokensService as TokensServiceClass } from 'src/modules/tokens/service/tokens.service';
import { UsersService as UsersServiceClass } from 'src/modules/users/service/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private TokensService: TokensServiceClass,
    private UsersService: UsersServiceClass,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const accessToken = request.accessToken;

    if (!accessToken) {
      throw new UnauthorizedException('User is unauthorized');
    }

    const accessTokenPayload = await this.TokensService.verifyAccessToken({
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
  }
}
