import {
  Column,
  DataType,
  Model,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import {
  RULE_ACTIONS_TYPE_NAME,
  RULE_EFFECTS_TYPE_NAME,
  RULE_OPERATORS_TYPE_NAME,
} from 'src/db/migrations/seeds/pre/rules.pre.seed';
import { UUIDV6_FUNCTION_NAME } from 'src/db/utils/common/getCreateUUIDV6PsqlFunctionQuery';

@Table({})
export class Rules extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: Sequelize.fn(UUIDV6_FUNCTION_NAME),
    primaryKey: true,
  })
  id: string;

  @Column({
    type: RULE_ACTIONS_TYPE_NAME,
    allowNull: false,
  })
  action: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  table: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  column: string;

  @Column({
    type: RULE_OPERATORS_TYPE_NAME,
  })
  operator: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  value: string;

  @Column({
    type: RULE_EFFECTS_TYPE_NAME,
  })
  effect: string;
}
