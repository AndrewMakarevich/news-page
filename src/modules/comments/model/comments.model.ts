import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { UUIDV6_FUNCTION_NAME } from 'src/db/utils/returnUUIDV6PsqlFunction';
import {
  ICommentsModelAttributes,
  ICommentsModelCreationAttributes,
} from './comments.model.interface';
import { Posts, Users } from 'src/db/models/models';
import {
  MAX_COMMENT_TEXT_LENGTH,
  MIN_COMMENT_TEXT_LENGTH,
} from '../comments.const';

@Table
export class Comments extends Model<
  ICommentsModelAttributes,
  ICommentsModelCreationAttributes
> {
  @Column({
    type: DataType.UUID,
    defaultValue: Sequelize.fn(UUIDV6_FUNCTION_NAME),
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(MAX_COMMENT_TEXT_LENGTH),
    validate: { min: MIN_COMMENT_TEXT_LENGTH },
    allowNull: false,
  })
  text: string;

  @ForeignKey(() => Users)
  @Column({ type: DataType.UUID })
  authorId: string;

  @ForeignKey(() => Posts)
  @Column({ type: DataType.UUID })
  postId: string;

  @BelongsTo(() => Users)
  author: Users;

  @BelongsTo(() => Posts)
  post: Posts;
}
