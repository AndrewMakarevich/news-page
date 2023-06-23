import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { UUIDV6_FUNCTION_NAME } from 'src/db/utils/getCreateUUIDV6PsqlFunctionQuery';
import {
  ITagsModelAttributes,
  ITagsModelCreationAttributes,
} from './tags.model.interface';
import { MAX_TAG_TEXT_LENGTH, MIN_TAG_TEXT_LENGTH } from '../tags.const';
import { Posts } from 'src/db/models/models';
import { PostsTags } from 'src/modules/postsTags/model/postsTags.model';

@Table
export class Tags extends Model<
  ITagsModelAttributes,
  ITagsModelCreationAttributes
> {
  @Column({
    type: DataType.UUID,
    defaultValue: Sequelize.fn(UUIDV6_FUNCTION_NAME),
    primaryKey: true,
  })
  id: string;

  @Column({
    type: DataType.STRING(MAX_TAG_TEXT_LENGTH),
    validate: { min: MIN_TAG_TEXT_LENGTH },
    allowNull: false,
  })
  text: string;

  @BelongsToMany(() => Posts, () => PostsTags)
  posts: Posts[];
}
