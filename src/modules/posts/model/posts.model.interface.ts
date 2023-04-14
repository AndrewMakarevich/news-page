import { IDefaultModelAttributes } from 'src/db/models/models.interface';

export interface IPostsModelCreationAttributes {
  header: string;
  text: string;
  authorId: string;
}

export interface IPostsModelAttributes
  extends IDefaultModelAttributes,
    IPostsModelCreationAttributes {}
