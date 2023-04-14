import { Permissions, Users } from 'src/db/models/models';
import { IDefaultModelAttributes } from 'src/db/models/models.interface';

export interface IRolesModelCreationAttributes {
  name: string;
}

export interface IRolesModelAttributes
  extends IDefaultModelAttributes,
    IRolesModelCreationAttributes {
  users?: Users[];
  permissions?: Permissions[];
}
