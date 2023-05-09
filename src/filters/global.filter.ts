import {
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Catch,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class GlobalFilter extends BaseExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    if (!(exception instanceof HttpException)) {
      const exceptionStack = (exception as Error).stack;
      const exceptionMessage = (exception as Error).message;

      exception = new HttpException(
        exceptionMessage || 'Internal server error',
        exceptionMessage
          ? HttpStatus.BAD_REQUEST
          : HttpStatus.INTERNAL_SERVER_ERROR,
      );

      (exception as HttpException).stack = exceptionStack;
    }

    console.log(exception);

    super.catch(exception, host);
  }
}
