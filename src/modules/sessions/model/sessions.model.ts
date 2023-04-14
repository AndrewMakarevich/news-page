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
import { UUIDV6_FUNCTION_NAME } from 'src/db/utils/returnUUIDV6PsqlFunction';

@Table
export class Sessions extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: Sequelize.fn(UUIDV6_FUNCTION_NAME),
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  ip: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  refreshToken: string;

  @ForeignKey(() => Users)
  @Column({ type: DataType.UUID })
  userId: string;

  @BelongsTo(() => Users)
  user: Users;
}
