import { Controller } from '@nestjs/common';
import { CommentsService } from '../service/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private CommentsService: CommentsService) {}
}
