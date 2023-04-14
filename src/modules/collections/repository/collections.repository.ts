import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Collections } from '../model/collections.model';

@Injectable()
export class CollectionsRepository {
  constructor(
    @InjectModel(Collections) private CollectionsModel: Collections,
  ) {}
}
