import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { getClientIp } from 'request-ip';

export const UserIp = createParamDecorator((_data, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  return getClientIp(request);
});
