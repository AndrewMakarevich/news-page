import { Injectable } from '@nestjs/common';
import { PostsRepository } from '../repository/posts.repository';

@Injectable()
export class PostsService {
  constructor(private PostsRepository: PostsRepository) {}
}
