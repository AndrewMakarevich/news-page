import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Permissions, Roles } from 'src/db/models/models';

@Table
export class RolesPermissions extends Model {
  @ForeignKey(() => Roles)
  @Column({ type: DataType.UUID })
  roleId: string;

  @ForeignKey(() => Permissions)
  @Column({ type: DataType.UUID })
  permissionId: string;
}
