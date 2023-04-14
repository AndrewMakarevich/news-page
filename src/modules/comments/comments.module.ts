import { Module } from '@nestjs/common';
import { CommentsController } from './controller/comments.controller';
import { CommentsService } from './service/comments.service';
import { CommentsRepository } from './repository/comments.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comments } from './model/comments.model';

@Module({
  imports: [SequelizeModule.forFeature([Comments])],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsRepository],
})
export class CommentsModule {}
