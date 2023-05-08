import { Injectable } from '@nestjs/common';
import { CommentsRepository } from '../repository/comments.repository';

@Injectable()
export class CommentsService {
  constructor(private CommentsRepository: CommentsRepository) {}
}
