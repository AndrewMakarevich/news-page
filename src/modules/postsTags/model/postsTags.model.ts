import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Posts } from 'src/db/models/models';
import { Tags } from 'src/modules/tags/model/tags.model';
import {
  IPostsTagsModelAttributes,
  IPostsTagsModelCreationAttributes,
} from './postsTags.model.interface';

@Table
export class PostsTags extends Model<
  IPostsTagsModelAttributes,
  IPostsTagsModelCreationAttributes
> {
  @ForeignKey(() => Posts)
  @Column({ type: DataType.UUID })
  postId: string;

  @ForeignKey(() => Tags)
  @Column({ type: DataType.UUID })
  tagId: string;
}
