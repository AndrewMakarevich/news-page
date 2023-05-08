import { IDefaultModelAttributes } from 'src/db/models/models.interface';

export interface IPostsTagsModelCreationAttributes {
  postId: string;
  tagId: string;
}

export interface IPostsTagsModelAttributes
  extends IDefaultModelAttributes,
    IPostsTagsModelCreationAttributes {}
