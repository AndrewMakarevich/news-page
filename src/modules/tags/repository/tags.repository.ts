import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tags } from '../model/tags.model';

@Injectable()
export class TagsRepository {
  constructor(@InjectModel(Tags) private TagsModel: Tags) {}
}
