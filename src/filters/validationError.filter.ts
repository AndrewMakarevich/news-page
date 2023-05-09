import { ExceptionFilter, ArgumentsHost, Catch } from '@nestjs/common';
import { ValidationErrorException } from 'src/exceptions/validationError.exception';
import { Response } from 'express';

@Catch(ValidationErrorException)
export class ValidationErrorFilter
  implements ExceptionFilter<ValidationErrorException>
{
  catch(exception: ValidationErrorException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const statusCode = exception.getStatus();
    const errorsMessagesToReturn: Array<string> = [];

    exception.getData().forEach((validationError) => {
      Object.keys(validationError.constraints).forEach((constraintKey) => {
        const constraintMessage = validationError.constraints[constraintKey];

        if (constraintMessage !== undefined) {
          errorsMessagesToReturn.push(constraintMessage);
        }
      });
    });

    return response.status(statusCode).json({
      statusCode,
      message: errorsMessagesToReturn,
      error: exception.message,
    });
  }
}
