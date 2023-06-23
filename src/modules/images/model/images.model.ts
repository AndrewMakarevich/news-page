import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { Posts, Users } from 'src/db/models/models';
import { UUIDV6_FUNCTION_NAME } from 'src/db/utils/getCreateUUIDV6PsqlFunctionQuery';
import {
  IPostImagesModelAttributes,
  IPostImagesModelCreationAttributes,
} from './images.model.interface';

@Table
export class Images extends Model<
  IPostImagesModelAttributes,
  IPostImagesModelCreationAttributes
> {
  @Column({
    type: DataType.UUID,
    defaultValue: Sequelize.fn(UUIDV6_FUNCTION_NAME),
    primaryKey: true,
  })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ForeignKey(() => Posts)
  @Column({ type: DataType.UUID })
  postId: string;

  @BelongsTo(() => Posts)
  post: Posts;

  @HasOne(() => Users)
  user: Users;
}
