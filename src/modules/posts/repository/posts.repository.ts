import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Posts } from '../model/posts.model';

@Injectable()
export class PostsRepository {
  constructor(@InjectModel(Posts) private PostsModel: Posts) {}
}
