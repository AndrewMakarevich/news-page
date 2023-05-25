import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
import { ITokenPayload } from 'src/modules/tokens/service/tokens.service.interface';

export const AccessTokenPayload = createParamDecorator(
  (key: keyof ITokenPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    return key ? request.accessTokenPayload?.[key] : request.accessTokenPayload;
  },
);
