import {
  RULE_ITEM_ACTIONS,
  RULE_ITEM_ARGUMENT_CONTEXTS,
  RULE_ITEM_OPERATORS,
} from '../ruleItems.const';
import { IDefaultModelAttributes } from '../../../db/models/models.interface';
import { Rules } from '../../rules/model/rules.model';

interface ITableContextColumnLeadValue {
  column: string;
}

interface ITableContextTableLeadValue {
  table: ITableContextTableInnerValue | ITableContextColumnInnerValue;
}

interface ITableContextTableInnerValue {
  name: string;
  table?: ITableContextTableInnerValue | ITableContextColumnInnerValue;
}

interface ITableContextColumnInnerValue {
  name: string;
  column?: string;
}

type ISubjectObjectRuleArgumentValue =
  | ITableContextTableLeadValue
  | ITableContextColumnLeadValue;

type IEnvironmentRuleArgumentValue =
  | { timestamp: string }
  | { time: string; timezone?: string };

type IConstantRuleArgumentValue = { value: string };

type IActionRuleArgumentValue = {
  action: (typeof RULE_ITEM_ACTIONS)[number];
};

export type IRuleArgumentValue =
  | ISubjectObjectRuleArgumentValue
  | IEnvironmentRuleArgumentValue
  | IConstantRuleArgumentValue
  | IActionRuleArgumentValue;

export type IRuleArgumentContext = (typeof RULE_ITEM_ARGUMENT_CONTEXTS)[number];

export type IRuleOperator = (typeof RULE_ITEM_OPERATORS)[number];

export interface IRuleItemModelCreationAttributes {
  description?: string;
  leftArgumentsContext: IRuleArgumentContext;
  leftArgumentValue: IRuleArgumentValue;
  operator: IRuleOperator;
  rightArgumentContext: IRuleArgumentContext;
  rightArgumentValue: IRuleArgumentValue;
}

export interface IRuleItemModelAttributes
  extends IDefaultModelAttributes,
    IRuleItemModelCreationAttributes {
  rulesWhereRuleItemIsTarget: Rules[];
  rulesWhereRuleItemIsCondition: Rules[];
}
