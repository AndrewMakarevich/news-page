import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
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
import { Sessions } from 'src/modules/sessions/model/sessions.model';
import { Images } from 'src/modules/images/model/images.model';
import { DataTypes } from 'sequelize';

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
    unique: true,
  })
  username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    validate: { isEmail: true },
    unique: true,
  })
  email: string;

  @Column({
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
  })
  activationToken: string;

  @Column({ type: DataType.CHAR(60), allowNull: false })
  password: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isBlocked: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isActivated: boolean;

  @ForeignKey(() => Roles)
  @Column({ type: DataType.UUID })
  roleId: string;

  @ForeignKey(() => Images)
  @Column({ type: DataType.UUID })
  avatarId: string;

  @BelongsTo(() => Images)
  avatar: Images;

  @BelongsTo(() => Roles)
  role: Roles;

  @HasMany(() => Posts)
  posts: Posts[];

  @HasMany(() => Comments)
  comments: Comments[];

  @HasMany(() => Sessions)
  sessions: Sessions;
}
