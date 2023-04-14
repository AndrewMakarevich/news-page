import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { UUIDV6_FUNCTION_NAME } from 'src/db/utils/returnUUIDV6PsqlFunction';
import {
  IUsersModelAttributes,
  IUsersModelCreationAttributes,
} from './user.model.interface';
import {
  MAX_USER_USERNAME_LENGTH,
  MIN_USER_USERNAME_LENGTH,
} from '../users.const';
import { Comments, Posts, Roles } from 'src/db/models/models';

@Table
export class Users extends Model<
  IUsersModelAttributes,
  IUsersModelCreationAttributes
> {
  @Column({
    type: DataType.UUID,
    defaultValue: Sequelize.fn(UUIDV6_FUNCTION_NAME),
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(MAX_USER_USERNAME_LENGTH),
    allowNull: false,
    validate: { min: MIN_USER_USERNAME_LENGTH },
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: { isEmail: true },
  })
  email: string;

  @Column({ type: DataType.CHAR(60), allowNull: false })
  password: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isBlocked: boolean;

  @ForeignKey(() => Roles)
  @Column({ type: DataType.UUID })
  roleId: string;

  @BelongsTo(() => Roles)
  role: Roles;

  @HasMany(() => Posts)
  posts: Posts[];

  @HasMany(() => Comments)
  comments: Comments[];
}
