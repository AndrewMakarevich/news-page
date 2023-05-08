import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostsTags } from './model/postsTags.model';
import { PostsTagsRepository } from './repository/postsTags.repository';

@Module({
  imports: [SequelizeModule.forFeature([PostsTags])],
  providers: [PostsTagsRepository],
})
export class PostsTagsModule {}
