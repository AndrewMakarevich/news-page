import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { UUIDV6_FUNCTION_NAME } from 'src/db/utils/returnUUIDV6PsqlFunction';
import {
  MAX_PERMISSION_NAME_LENGTH,
  MIN_PERMISSION_NAME_LENGTH,
} from '../permissions.const';
import { Roles, RolesPermissions } from 'src/db/models/models';
import {
  IPermissionsModelAttributes,
  IPermissionsModelCreationAttributes,
} from './permissions.model.interface';

@Table
export class Permissions extends Model<
  IPermissionsModelAttributes,
  IPermissionsModelCreationAttributes
> {
  @Column({
    type: DataType.UUID,
    defaultValue: Sequelize.fn(UUIDV6_FUNCTION_NAME),
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(MAX_PERMISSION_NAME_LENGTH),
    validate: { min: MIN_PERMISSION_NAME_LENGTH },
    allowNull: false,
  })
  name: string;

  @BelongsToMany(() => Roles, () => RolesPermissions)
  roles: Roles[];
}
