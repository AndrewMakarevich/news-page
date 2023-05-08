import { Posts } from 'src/db/models/models';
import { IDefaultModelAttributes } from 'src/db/models/models.interface';

export interface IPostImagesModelCreationAttributes {
  name: string;
  postId: string;
}

export interface IPostImagesModelAttributes
  extends IPostImagesModelCreationAttributes,
    IDefaultModelAttributes {
  post?: Posts;
}
