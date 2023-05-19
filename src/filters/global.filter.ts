import {
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Catch,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { ValidationErrorItem } from 'sequelize';

@Catch()
export class GlobalFilter extends BaseExceptionFilter {
  private readonly globalFilterLogger = new Logger('GlobalExceptionsHandler');

  catch(exception: any, host: ArgumentsHost) {
    if (!(exception instanceof HttpException)) {
      const exceptionStack = (exception as Error).stack;
      let exceptionMessage = (exception as Error).message;
      const exceptionErrors = exception.errors as ValidationErrorItem[];

      if (Array.isArray(exceptionErrors) && exceptionErrors.length) {
        exceptionMessage = exceptionErrors.map((err) => err.message).join('. ');
      }

      exception = new HttpException(
        exceptionMessage || 'Internal server error',
        exceptionMessage
          ? HttpStatus.BAD_REQUEST
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );

      (exception as HttpException).stack = exceptionStack;
    }

    this.globalFilterLogger.error(exception.message, exception.stack);

    super.catch(exception, host);
  }
}
