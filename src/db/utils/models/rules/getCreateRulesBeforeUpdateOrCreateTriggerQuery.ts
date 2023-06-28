import { Rules } from 'src/db/models/models';
import {
  getCreatePsqlTriggerQuery,
  psqlTriggerEvents,
  psqlTriggerFireMode,
  psqlTriggerForEachMode,
} from '../../common/getCreatePsqlTriggerQuery/getCreatePsqlTriggerQuery';
import { RULES_BEFORE_UPDATE_OR_CREATE_TRIGGER_FUNCTION_NAME } from './getCreateRulesBeforeUpdateOrCreateTriggerFunctionQuery';

export const RULES_BEFORE_UPDATE_OR_CREATE_TRIGGER_NAME =
  'rules_before_update_or_create_trigger';

export const getCreateRulesBeforeUpdateOrCreateTriggerQuery = () => {
  return getCreatePsqlTriggerQuery({
    name: RULES_BEFORE_UPDATE_OR_CREATE_TRIGGER_NAME,
    fireMode: psqlTriggerFireMode.BEFORE,
    events: [
      psqlTriggerEvents.INSERT,
      { name: psqlTriggerEvents.UPDATE, of: ['"table"'] },
    ],
    forEachMode: psqlTriggerForEachMode.ROW,
    onTable: `"${Rules.name}"`,
    functionName: RULES_BEFORE_UPDATE_OR_CREATE_TRIGGER_FUNCTION_NAME,
  });
};
