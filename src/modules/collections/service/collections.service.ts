import { Injectable } from '@nestjs/common';
import { CollectionsRepository } from '../repository/collections.repository';

@Injectable()
export class CollectionsService {
  constructor(private CollectionsRepository: CollectionsRepository) {}
}
