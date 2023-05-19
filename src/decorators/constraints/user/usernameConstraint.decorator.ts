import { applyDecorators } from '@nestjs/common';
import { IsString } from 'class-validator';
import {
  MAX_USER_USERNAME_LENGTH,
  MIN_USER_USERNAME_LENGTH,
} from 'src/modules/users/users.const';
import { MinMaxConstraint } from '../utils/minMaxConstraint.decorator';

export function UsernameConstraint() {
  return applyDecorators(
    IsString(),
    MinMaxConstraint({
      min: MIN_USER_USERNAME_LENGTH,
      max: MAX_USER_USERNAME_LENGTH,
      entityName: 'Username',
    }),
  );
}
