import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationError } from 'class-validator';

export class ValidationErrorException extends HttpException {
  data: ValidationError[];

  constructor(data: ValidationError[]) {
    super('ValidationError', HttpStatus.BAD_REQUEST);

    this.data = data;
  }

  getData() {
    return this.data;
  }
}
