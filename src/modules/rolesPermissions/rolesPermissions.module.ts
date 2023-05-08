import { Module } from '@nestjs/common';
import { RolesPermissionsRepository } from './repository/rolesPermissions.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesPermissions } from './model/rolesPermissions.model';

@Module({
  imports: [SequelizeModule.forFeature([RolesPermissions])],
  providers: [RolesPermissionsRepository],
})
export class RolesPermissionsModule {}
