import { Module } from '@nestjs/common';
import { TagsController } from './controller/tags.controller';
import { TagsService } from './service/tags.service';
import { TagsRepository } from './repository/tags.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tags } from './model/tags.model';

@Module({
  imports: [SequelizeModule.forFeature([Tags])],
  controllers: [TagsController],
  providers: [TagsService, TagsRepository],
})
export class TagsModule {}
