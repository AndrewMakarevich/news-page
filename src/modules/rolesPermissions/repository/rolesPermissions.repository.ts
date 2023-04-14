import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesPermissions } from '../model/rolesPermissions.model';

@Injectable()
export class RolesPermissionsRepository {
  constructor(
    @InjectModel(RolesPermissions)
    private RolesPermissionsModel: RolesPermissions,
  ) {}
}
