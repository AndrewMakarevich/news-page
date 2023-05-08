import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Images } from '../model/images.model';

@Injectable()
export class ImagesRepository {
  constructor(@InjectModel(Images) private ImagesModel: Images) {}
}
