import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './modules/users/users.module';
import * as dbConfig from './db/config/config';
import * as dotenv from 'dotenv';
import { env } from 'process';
import {
  Roles,
  Permissions,
  Posts,
  RolesPermissions,
  Users,
  Tags,
  PostsTags,
} from './db/models/models';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { RolesPermissionsModule } from './modules/rolesPermissions/rolesPermissions.module';
import { PostsModule } from './modules/posts/posts.module';
import { TagsModule } from './modules/tags/tags.module';
import { PostsTagsModule } from './modules/postsTags/postsTags.module';

dotenv.config();
const sequelizeConfig = dbConfig[env.NODE_ENV || 'development'];

@Module({
  imports: [
    UsersModule,
    RolesModule,
    PermissionsModule,
    RolesPermissionsModule,
    PostsModule,
    TagsModule,
    PostsTagsModule,
    SequelizeModule.forRoot({
      ...sequelizeConfig,
      autoLoadModels: true,
      sync: { force: true },
      models: [
        Users,
        Roles,
        Permissions,
        RolesPermissions,
        Posts,
        Tags,
        PostsTags,
      ],
      logging: console.log,
    }),
    TagsModule,
  ],
})
export class AppModule {}
