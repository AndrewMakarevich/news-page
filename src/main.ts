import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import { env } from 'process';
import { AppModule } from './app.module';
import { ValidationErrorException } from './exceptions/validationError.exception';
import { ValidationErrorFilter } from './filters/validationError.filter';
import { GlobalFilter } from './filters/global.filter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => new ValidationErrorException(errors),
    }),
  );

  app.useGlobalFilters(
    new GlobalFilter(httpAdapter),
    new ValidationErrorFilter(),
  );

  await app.listen(env.APP_INTERNAL_PORT || 3001);
}
bootstrap();
