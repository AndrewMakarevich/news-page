import { Controller } from '@nestjs/common';
import { CollectionsService } from '../service/collections.service';

@Controller('collections')
export class CollectionsController {
  constructor(private CollectionsService: CollectionsService) {}
}
