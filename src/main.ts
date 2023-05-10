import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { env } from 'process';
import { AppModule } from './app.module';
import { ValidationErrorException } from './exceptions/validationError.exception';
import { ValidationErrorFilter } from './filters/validationError.filter';
import { GlobalFilter } from './filters/global.filter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new ValidationErrorException(errors),
    }),
  );
  app.useGlobalFilters(
    new ValidationErrorFilter(),
    new GlobalFilter(httpAdapter),
  );

  await app.listen(env.APP_PORT);
}
bootstrap();
