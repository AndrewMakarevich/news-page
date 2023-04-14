import { IDefaultModelAttributes } from 'src/db/models/models.interface';

export interface IRolesPermissionsModelCreationAttributes {
  roleId: string;
  permissionId: string;
}

export interface IRolesPermissionsModelAttributes
  extends Omit<IDefaultModelAttributes, 'id'>,
    IRolesPermissionsModelCreationAttributes {}
