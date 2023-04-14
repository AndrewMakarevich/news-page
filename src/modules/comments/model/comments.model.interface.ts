import { Posts, Users } from 'src/db/models/models';
import { IDefaultModelAttributes } from 'src/db/models/models.interface';

export interface ICommentsModelCreationAttributes {
  authorId: string;
  postId: string;
  text: string;
}

export interface ICommentsModelAttributes
  extends IDefaultModelAttributes,
    ICommentsModelCreationAttributes {
  author?: Users;
  post?: Posts;
}
