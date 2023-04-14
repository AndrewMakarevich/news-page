import { Module } from '@nestjs/common';
import { RolesRepository } from './repository/roles.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Roles } from './model/roles.model';

@Module({
  imports: [SequelizeModule.forFeature([Roles])],
  providers: [RolesRepository],
})
export class RolesModule {}
