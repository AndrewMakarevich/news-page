import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PostsTags } from '../model/postsTags.model';

@Injectable()
export class PostsTagsRepository {
  constructor(@InjectModel(PostsTags) private PostsTags: PostsTags) {}
}
