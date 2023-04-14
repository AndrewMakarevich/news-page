import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Roles } from '../model/roles.model';

@Injectable()
export class RolesRepository {
  constructor(@InjectModel(Roles) private RolesModel: Roles) {}
}
