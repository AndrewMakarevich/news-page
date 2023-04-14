import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PostsCollections } from './model/postsCollections.model';
import { PostsCollectionsRepository } from './repository/postsCollections.repository';

@Module({
  imports: [SequelizeModule.forFeature([PostsCollections])],
  providers: [PostsCollectionsRepository],
})
export class PostsCollectionsModule {}
