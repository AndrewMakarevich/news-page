import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comments } from '../model/comments.model';

@Injectable()
export class CommentsRepository {
  constructor(@InjectModel(Comments) private CommentsModel: Comments) {}
}
