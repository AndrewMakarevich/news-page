import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PostsCollections } from '../model/postsCollections.model';

@Injectable()
export class PostsCollectionsRepository {
  constructor(
    @InjectModel(PostsCollections)
    private PostsCollectionsModel: PostsCollections,
  ) {}
}
