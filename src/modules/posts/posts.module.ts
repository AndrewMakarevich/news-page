import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Posts } from './model/posts.model';
import { PostsRepository } from './repository/posts.repository';
import { PostsController } from './controller/posts.controller';
import { PostsService } from './service/posts.service';

@Module({
  imports: [SequelizeModule.forFeature([Posts])],
  controllers: [PostsController],
  providers: [PostsService, PostsRepository],
})
export class PostsModule {}
