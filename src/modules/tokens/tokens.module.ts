import { Module } from '@nestjs/common';
import { TokensService } from './service/tokens.service';

@Module({
  providers: [TokensService],
  exports: [TokensService],
})
export class TokensModule {}
