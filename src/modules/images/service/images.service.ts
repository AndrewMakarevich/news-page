import { Injectable } from '@nestjs/common';
import { ImagesRepository as ImagesRepositoryClass } from '../repository/images.repository';

@Injectable()
export class ImagesService {
  constructor(private ImagesRepository: ImagesRepositoryClass) {}
}
