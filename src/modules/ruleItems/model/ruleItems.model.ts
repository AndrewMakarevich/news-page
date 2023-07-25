import {
  Column,
  DataType,
  HasMany,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { UUIDV6_FUNCTION_NAME } from '../../../db/utils/common/getCreateUUIDV6PsqlFunctionQuery';
import {
  IRuleArgumentContext,
  IRuleArgumentValue,
  IRuleItemModelAttributes,
  IRuleItemModelCreationAttributes,
  IRuleOperator,
} from './ruleItems.model.interface';
import {
  RULE_ITEM_ARGUMENT_CONTEXTS_TYPE_NAME,
  RULE_ITEM_OPERATORS_TYPE_NAME,
} from '../ruleItems.const';
import { Rules } from '../../rules/model/rules.model';

@Table({})
export class RuleItems extends Model<
  IRuleItemModelAttributes,
  IRuleItemModelCreationAttributes
> {
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
    allowNull: false,
  })
  leftArgumentContext: IRuleArgumentContext;

  @Column({
    type: DataType.JSONB,
  })
  leftArgumentValue: IRuleArgumentValue;

  @Column({
    type: RULE_ITEM_OPERATORS_TYPE_NAME,
  })
  operator: IRuleOperator;

  @Column({
    type: RULE_ITEM_ARGUMENT_CONTEXTS_TYPE_NAME,
  })
  rightArgumentContext: IRuleArgumentContext;

  @Column({
    type: DataType.JSONB,
  })
  rightArgumentValue: IRuleArgumentValue;

  @HasMany(() => Rules, { foreignKey: 'targetRuleId' })
  rulesWhereRuleItemIsTarget: Rules[];

  @HasMany(() => Rules, { foreignKey: 'conditionRuleId' })
  rulesWhereRuleItemIsCondition: Rules[];
}
