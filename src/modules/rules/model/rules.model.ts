import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { UUIDV6_FUNCTION_NAME } from 'src/db/utils/common/getCreateUUIDV6PsqlFunctionQuery';
import { RuleItems } from '../../../db/models/models';

@Table({})
export class Rules extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: Sequelize.fn(UUIDV6_FUNCTION_NAME),
    primaryKey: true,
  })
  id: string;

  @ForeignKey(() => RuleItems)
  targetRuleId: string;

  @ForeignKey(() => RuleItems)
  conditionRuleId: string;

  @BelongsTo(() => RuleItems)
  targetRule: RuleItems;

  @BelongsTo(() => RuleItems)
  conditionRule: RuleItems;
}
