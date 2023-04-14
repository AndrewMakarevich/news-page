import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Collections } from './model/collections.model';
import { CollectionsService } from './service/collections.service';
import { CollectionsRepository } from './repository/collections.repository';
import { CollectionsController } from './controller/collections.controller';

@Module({
  imports: [SequelizeModule.forFeature([Collections])],
  controllers: [CollectionsController],
  providers: [CollectionsService, CollectionsRepository],
})
export class CollectionsModule {}
