import { applyDecorators } from '@nestjs/common';
import { IsUUID } from 'class-validator';

export function ActivationTokenConstraint() {
  return applyDecorators(
    IsUUID(4, { message: 'ActivationToken must be an UUIDV4' }),
  );
}
