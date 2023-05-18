import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class ParseJWTPipe implements PipeTransform {
  constructor(private tokenType: 'access' | 'refresh') {}

  transform(value: any, _metadata: ArgumentMetadata) {
    if (value?.split('.').length === 3) {
      return value;
    }

    throw new BadRequestException(`Incorrect ${this.tokenType} token`);
  }
}
