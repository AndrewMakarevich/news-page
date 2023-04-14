import { Comments } from 'src/db/models/models';
import { IDefaultModelAttributes } from 'src/db/models/models.interface';
import { Tags } from 'src/modules/tags/model/tags.model';

export interface IPostsModelCreationAttributes {
  header: string;
  text: string;
  authorId: string;
}

export interface IPostsModelAttributes
  extends IDefaultModelAttributes,
    IPostsModelCreationAttributes {
  tags?: Tags[];
  comments?: Comments[];
}
