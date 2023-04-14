import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { UUIDV6_FUNCTION_NAME } from 'src/db/utils/returnUUIDV6PsqlFunction';
import { MAX_ROLE_NAME_LENGTH, MIN_ROLE_NAME_LENGTH } from '../roles.const';
import {
  IRolesModelAttributes,
  IRolesModelCreationAttributes,
} from './roles.model.interface';
import { Permissions, RolesPermissions, Users } from 'src/db/models/models';

@Table({ indexes: [{ unique: true, fields: ['name'] }] })
export class Roles extends Model<
  IRolesModelAttributes,
  IRolesModelCreationAttributes
> {
  @Column({
    type: DataType.UUID,
    defaultValue: Sequelize.fn(UUIDV6_FUNCTION_NAME),
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(MAX_ROLE_NAME_LENGTH),
    allowNull: true,
    validate: { min: MIN_ROLE_NAME_LENGTH },
  })
  name: string;

  @HasMany(() => Users)
  users: Users[];

  @BelongsToMany(() => Permissions, () => RolesPermissions)
  permissions: Permissions[];
}
