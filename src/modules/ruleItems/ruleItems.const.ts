export const RULE_ITEM_OPERATORS_TYPE_NAME = 'rule_item_operators';
export const RULE_ITEM_ARGUMENT_CONTEXTS_TYPE_NAME = 'rule_item_contexts';
export const RULE_ITEM_ACTIONS_TYPE_NAME = 'rule_item_actions';

export const RULE_ITEM_OPERATORS = [
  'eq',
  'ne',
  'gte',
  'gt',
  'lt',
  'lte',
  'regexp',
  'iRegexp',
] as const;
export const RULE_ITEM_ARGUMENT_CONTEXTS = [
  'environment',
  'subject',
  'object',
  'constant',
  'action',
] as const;
export const RULE_ITEM_ACTIONS = [
  'insert',
  'select',
  'update',
  'delete',
] as const;
