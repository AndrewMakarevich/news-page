import { Injectable } from '@nestjs/common';
import { TagsRepository } from '../repository/tags.repository';

@Injectable()
export class TagsService {
  constructor(private TagsRepository: TagsRepository) {}
}
