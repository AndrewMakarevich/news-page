import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Collections, Posts } from 'src/db/models/models';
import {
  IPostsCollectionsModelAttributes,
  IPostsCollectionsModelCreationAttributes,
} from './postsCollections.model.interface';

@Table
export class PostsCollections extends Model<
  IPostsCollectionsModelAttributes,
  IPostsCollectionsModelCreationAttributes
> {
  @ForeignKey(() => Posts)
  @Column({ type: DataType.UUID })
  postId: string;

  @ForeignKey(() => Collections)
  @Column({ type: DataType.UUID })
  collectionId: string;
}
