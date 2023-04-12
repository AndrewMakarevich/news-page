import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './modules/users/users.module';
import * as dbConfig from './config/config';
import * as dotenv from 'dotenv';
import { env } from 'process';
import { User } from './models/models';

dotenv.config();
const sequelizeConfig = dbConfig[env.NODE_ENV || 'development'];

@Module({
  imports: [
    UsersModule,
    SequelizeModule.forRoot({
      ...sequelizeConfig,
      autoLoadModels: true,
      models: [User],
      logging: console.log,
    }),
  ],
})
export class AppModule {}
