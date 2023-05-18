import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sessions } from './model/sessions.model';
import { SessionsRepository } from './repository/sessions.repository';
import { SessionsService } from './service/sessions.service';
import { SessionsController } from './controller/sessions.controller';
import { TokensModule } from '../tokens/tokens.module';

@Module({
  imports: [SequelizeModule.forFeature([Sessions]), TokensModule],
  controllers: [SessionsController],
  providers: [SessionsService, SessionsRepository],
  exports: [SessionsService, SessionsRepository],
})
export class SessionsModule {}
