import { Module, DynamicModule } from '@nestjs/common';
import { createClient, RedisClientOptions } from 'redis';
import { RedisRepository } from './repository/redis.repository';
import { REDIS_CLIENT_PROVIDER_NAME } from './redis.const';

@Module({
  providers: [RedisRepository],
  exports: [RedisRepository],
})
export class RedisModule {
  static forRoot(options: RedisClientOptions): DynamicModule {
    const redisClient = createClient(options);

    return {
      module: RedisModule,
      global: true,
      providers: [
        {
          provide: REDIS_CLIENT_PROVIDER_NAME,
          useFactory: async () => {
            await redisClient.connect();

            return redisClient;
          },
        },
      ],
    };
  }
}
