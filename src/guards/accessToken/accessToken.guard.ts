import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

import { TokensService as TokensServiceClass } from 'src/modules/tokens/service/tokens.service';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(private TokensService: TokensServiceClass) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const accessToken = request.headers.authorization?.split('Bearer ')[1];

    if (!accessToken) {
      throw new UnauthorizedException(
        'User is unauthorized. Access token must be provided',
      );
    }

    const accessTokenPayload = this.TokensService.decodeToken({
      token: accessToken,
    });

    request.accessToken = accessToken;
    request.accessTokenPayload = accessTokenPayload;

    return true;
  }
}
