import { Injectable } from '@nestjs/common';
import { RolesRepository } from '../repository/roles.repository';

@Injectable()
export class RolesService {
  constructor(private RolesRepository: RolesRepository) {}
}
