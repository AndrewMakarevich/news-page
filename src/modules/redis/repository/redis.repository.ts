import { Inject, Injectable } from '@nestjs/common';
import { REDIS_CLIENT_PROVIDER_NAME } from '../redis.const';
import { RedisClientType } from '@redis/client';

@Injectable()
export class RedisRepository {
  constructor(
    @Inject(REDIS_CLIENT_PROVIDER_NAME) private RedisClient: RedisClientType,
  ) {}

  get(key: string) {
    return this.RedisClient.GET(key);
  }

  set(key: string, value: number | string) {
    return this.RedisClient.SET(key, value);
  }
}
