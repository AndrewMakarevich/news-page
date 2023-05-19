import { applyDecorators } from '@nestjs/common';
import { IsEmail } from 'class-validator';

export function EmailConstraint() {
  return applyDecorators(IsEmail());
}
