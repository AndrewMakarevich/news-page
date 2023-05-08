import { Posts } from 'src/db/models/models';
import { IDefaultModelAttributes } from 'src/db/models/models.interface';

export interface ITagsModelCreationAttributes {
  text: string;
}

export interface ITagsModelAttributes
  extends IDefaultModelAttributes,
    ITagsModelCreationAttributes {
  posts?: Posts[];
}
