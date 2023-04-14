import { Controller } from '@nestjs/common';
import { PostsService } from '../service/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private PostsService: PostsService) {}
}
