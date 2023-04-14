import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Sessions } from './model/sessions.model';
import { SessionsRepository } from './repository/sessions.repository';

@Module({
  imports: [SequelizeModule.forFeature([Sessions])],
  providers: [SessionsRepository],
})
export class SessionsModule {}
