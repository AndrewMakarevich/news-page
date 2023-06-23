import {
  Table,
  Model,
  DataType,
  Sequelize,
  Column,
  BelongsToMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { Posts, PostsCollections, Users } from 'src/db/models/models';
import { UUIDV6_FUNCTION_NAME } from 'src/db/utils/getCreateUUIDV6PsqlFunctionQuery';

@Table
export class Collections extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: Sequelize.fn(UUIDV6_FUNCTION_NAME),
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(35),
    validate: { min: 2 },
    allowNull: false,
  })
  name: string;

  @ForeignKey(() => Users)
  @Column({ type: DataType.UUID })
  authorId: string;

  @BelongsTo(() => Users)
  author: Users;

  @BelongsToMany(() => Posts, () => PostsCollections)
  posts: Posts[];
}
