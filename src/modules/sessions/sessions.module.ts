import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sessions } from './model/sessions.model';
import { SessionsRepository } from './repository/sessions.repository';
import { SessionsService } from './service/sessions.service';
import { SessionsController } from './controller/sessions.controller';

@Module({
  imports: [SequelizeModule.forFeature([Sessions])],
  controllers: [SessionsController],
  providers: [SessionsService, SessionsRepository],
})
export class SessionsModule {}
