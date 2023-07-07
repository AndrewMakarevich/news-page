import {
  Column,
  DataType,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { UUIDV6_FUNCTION_NAME } from '../../../db/utils/common/getCreateUUIDV6PsqlFunctionQuery';
import {
  RULE_ITEM_ARGUMENT_CONTEXTS_TYPE_NAME,
  RULE_ITEM_OPERATORS_TYPE_NAME,
} from '../../../db/migrations/seeds/pre/ruleItems.pre.seed';

@Table({})
export class RuleItems extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: Sequelize.fn(UUIDV6_FUNCTION_NAME),
  })
  id: string;

  @Column({
    type: DataType.TEXT,
  })
  description: string;

  @Column({
    type: RULE_ITEM_ARGUMENT_CONTEXTS_TYPE_NAME,
  })
  leftArgumentContext: string;

  @Column({
    type: DataType.STRING,
  })
  leftArgumentTable: string;

  @Column({
    type: DataType.STRING,
  })
  leftArgumentColumn: string;

  @Column({
    type: RULE_ITEM_OPERATORS_TYPE_NAME,
  })
  operator: string;

  @Column({
    type: RULE_ITEM_ARGUMENT_CONTEXTS_TYPE_NAME,
  })
  rightArgumentContext: string;

  @Column({
    type: DataType.STRING,
  })
  rightArgumentTable: string;

  @Column({
    type: DataType.STRING,
  })
  rightArgumentColumn: string;
}
