import { DataTypes } from 'sequelize';
import {
  DataType,
  Table,
  Model,
  Sequelize,
  Column,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { UUIDV6_FUNCTION_NAME } from 'src/db/utils/returnUUIDV6PsqlFunction';
import { MAX_POST_HEADER_LENGTH, MIN_POST_HEADER_LENGTH } from '../posts.const';
import {
  Collections,
  Comments,
  PostsCollections,
  Users,
} from 'src/db/models/models';
import {
  IPostsModelAttributes,
  IPostsModelCreationAttributes,
} from './posts.model.interface';
import { Tags } from 'src/modules/tags/model/tags.model';
import { PostsTags } from 'src/modules/postsTags/model/postsTags.model';
import { Images } from 'src/modules/images/model/images.model';

@Table
export class Posts extends Model<
  IPostsModelAttributes,
  IPostsModelCreationAttributes
> {
  @Column({
    type: DataType.UUID,
    defaultValue: Sequelize.fn(UUIDV6_FUNCTION_NAME),
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataTypes.STRING(MAX_POST_HEADER_LENGTH),
    validate: { min: MIN_POST_HEADER_LENGTH },
    allowNull: false,
  })
  header: string;

  @Column({
    type: DataTypes.TEXT,
    allowNull: false,
  })
  text: string;

  @ForeignKey(() => Users)
  @Column({ type: DataType.UUID })
  authorId: string;

  @BelongsTo(() => Users)
  author: Users;

  @BelongsToMany(() => Tags, () => PostsTags)
  tags: Tags[];

  @BelongsToMany(() => Collections, () => PostsCollections)
  collections: Collections[];

  @HasMany(() => Comments)
  comments: Comments;

  @HasMany(() => Images)
  images: Images[];
}
