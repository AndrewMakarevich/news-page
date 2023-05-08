import { IDefaultModelAttributes } from 'src/db/models/models.interface';

export interface IPostsCollectionsModelCreationAttributes {
  postId: string;
  collectionId: string;
}

export interface IPostsCollectionsModelAttributes
  extends IDefaultModelAttributes,
    IPostsCollectionsModelCreationAttributes {}
