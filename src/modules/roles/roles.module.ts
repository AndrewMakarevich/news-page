import { Module } from '@nestjs/common';
import { RolesRepository } from './repository/roles.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Roles } from './model/roles.model';
import { RolesService } from './service/roles.service';
import { RolesController } from './controller/roles.controller';

@Module({
  imports: [SequelizeModule.forFeature([Roles])],
  controllers: [RolesController],
  providers: [RolesService, RolesRepository],
})
export class RolesModule {}
