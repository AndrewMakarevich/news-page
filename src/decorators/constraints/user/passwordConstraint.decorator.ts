import { applyDecorators } from '@nestjs/common';
import {
  MAX_USER_PASSWORD_LENGTH,
  MIN_USER_PASSWORD_LENGTH,
} from 'src/modules/users/users.const';
import { MinMaxConstraint } from '../utils/minMaxConstraint.decorator';
import { IsString } from 'class-validator';

export function PasswordConstraint() {
  return applyDecorators(
    IsString({ message: 'Password must be a string' }),
    MinMaxConstraint({
      min: MIN_USER_PASSWORD_LENGTH,
      max: MAX_USER_PASSWORD_LENGTH,
      entityName: 'Password',
    }),
  );
}
