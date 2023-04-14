import { Posts } from 'src/db/models/models';
import { IDefaultModelAttributes } from 'src/db/models/models.interface';

export interface ICollectionsModelCreationAttributes {
  authorId: string;
  name: string;
}

export interface ICollectionsModelAttributes
  extends IDefaultModelAttributes,
    ICollectionsModelCreationAttributes {
  posts?: Posts[];
}
