import { applyDecorators } from '@nestjs/common';
import {
  MAX_USER_PASSWORD_LENGTH,
  MIN_USER_PASSWORD_LENGTH,
} from 'src/modules/users/users.const';
import { MinMaxConstraint } from '../utils/minMaxConstraint.decorator';

export function PasswordConstraint() {
  return applyDecorators(
    MinMaxConstraint({
      min: MIN_USER_PASSWORD_LENGTH,
      max: MAX_USER_PASSWORD_LENGTH,
      entityName: 'Password',
    }),
  );
}
