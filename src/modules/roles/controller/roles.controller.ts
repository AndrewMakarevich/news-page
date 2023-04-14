import { Controller } from '@nestjs/common';
import { RolesService } from '../service/roles.service';

@Controller()
export class RolesController {
  constructor(private RolesService: RolesService) {}
}
