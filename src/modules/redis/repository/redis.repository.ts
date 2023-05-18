import { Inject, Injectable } from '@nestjs/common';
import { REDIS_CLIENT_PROVIDER_NAME } from '../redis.const';
import { RedisClientType } from 'redis';

@Injectable()
export class RedisRepository {
  constructor(
    @Inject(REDIS_CLIENT_PROVIDER_NAME) private RedisClient: RedisClientType,
  ) {}

  GET(...params: Parameters<typeof this.RedisClient.GET>) {
    return this.RedisClient.GET(...params);
  }

  SET(...params: Parameters<typeof this.RedisClient.SET>) {
    return this.RedisClient.SET(...params);
  }
}
