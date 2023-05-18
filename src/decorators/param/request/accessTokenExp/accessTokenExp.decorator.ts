import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const AccessTokenExp = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    return request.accessTokenExp;
  },
);
