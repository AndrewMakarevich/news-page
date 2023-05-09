import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ValidationErrorException } from './exceptions/validationError.exception';
import { ValidationErrorFilter } from './filters/validationError.filter';
import { GlobalFilter } from './filters/global.filter';

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

  await app.listen(3000);
}
bootstrap();
