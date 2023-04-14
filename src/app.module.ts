import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './modules/users/users.module';
import * as dbConfig from './db/config/config';
import * as dotenv from 'dotenv';
import { env } from 'process';
import {
  Permissions,
  Posts,
  RolesPermissions,
  Users,
} from './db/models/models';
import { RolesModule } from './modules/roles/roles.module';
import { Roles } from './modules/roles/model/roles.model';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { RolesPermissionsModule } from './modules/rolesPermissions/rolesPermissions.module';
import { PostsModule } from './modules/posts/posts.module';

dotenv.config();
const sequelizeConfig = dbConfig[env.NODE_ENV || 'development'];

@Module({
  imports: [
    UsersModule,
    RolesModule,
    PermissionsModule,
    RolesPermissionsModule,
    PostsModule,
    SequelizeModule.forRoot({
      ...sequelizeConfig,
      autoLoadModels: true,
      sync: { force: true },
      models: [Users, Roles, Permissions, RolesPermissions, Posts],
      logging: console.log,
    }),
  ],
})
export class AppModule {}
