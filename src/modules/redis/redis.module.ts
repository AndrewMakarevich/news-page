import { Module, DynamicModule } from '@nestjs/common';
import { createClient, RedisClientOptions } from 'redis';
import { RedisRepository } from './repository/redis.repository';

@Module({
  providers: [RedisRepository],
  exports: [RedisRepository],
})
export class RedisModule {
  static forRoot(options: RedisClientOptions): DynamicModule {
    const redisClient = createClient(options);

    return {
      module: RedisModule,
      providers: [{ provide: 'REDIS_CLIENT', useFactory: async () => {
        
      } }],
    };
  }
}
