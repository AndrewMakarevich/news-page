import { Roles } from 'src/db/models/models';
import { IDefaultModelAttributes } from 'src/db/models/models.interface';

export interface IPermissionsModelCreationAttributes {
  name: string;
}

export interface IPermissionsModelAttributes
  extends IDefaultModelAttributes,
    IPermissionsModelCreationAttributes {
  roles?: Roles[];
}
