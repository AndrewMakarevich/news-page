import { Controller } from '@nestjs/common';
import { ImagesService as ImagesServiceClass } from '../service/images.service';

@Controller('images')
export class ImagesController {
  constructor(private ImagesService: ImagesServiceClass) {}
}
