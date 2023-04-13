import {
  Column,
  DataType,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { UUIDV6_FUNCTION_NAME } from 'src/db/utils/returnUUIDV6PsqlFunction';
import {
  IUserModelAttributes,
  IUserModelCreationAttributes,
} from './user.model.interface';

@Table
export class User extends Model<
  IUserModelAttributes,
  IUserModelCreationAttributes
> {
  @Column({
    type: DataType.UUID,
    defaultValue: Sequelize.fn(UUIDV6_FUNCTION_NAME),
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING(45), allowNull: false, validate: { min: 2 } })
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
}
