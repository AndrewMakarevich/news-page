import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { Users } from 'src/db/models/models';
import { UUIDV6_FUNCTION_NAME } from 'src/db/utils/common/getCreateUUIDV6PsqlFunctionQuery';
import {
  ISessionsModelAttributes,
  ISessionsModelCreationAttributes,
} from './sessions.model.interface';

@Table
export class Sessions extends Model<
  ISessionsModelAttributes,
  ISessionsModelCreationAttributes
> {
  @Column({
    type: DataType.UUID,
    defaultValue: Sequelize.fn(UUIDV6_FUNCTION_NAME),
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(60),
  })
  ip: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  refreshTokenSignature: string;

  @ForeignKey(() => Users)
  @Column({ type: DataType.UUID })
  userId: string;

  @BelongsTo(() => Users)
  user: Users;
}
