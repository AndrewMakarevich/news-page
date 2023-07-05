import { Rules } from 'src/db/models/models';
import { RULES_BEFORE_UPDATE_OR_CREATE_TRIGGER_FUNCTION_NAME } from './getCreateRulesBeforeUpdateOrCreateTriggerFunctionQuery';
import {
  psqlTriggerEvents,
  psqlTriggerFireMode,
  psqlTriggerForEachMode,
} from 'src/db/helpers/triggerQueryBuilderHelper/triggerQueryBuilderHelper.const';
import { TriggerQueryBuilderHelper } from 'src/db/helpers/triggerQueryBuilderHelper/triggerQueryBuilderHelper';

export const RULES_BEFORE_UPDATE_OR_CREATE_TRIGGER_NAME =
  'rules_before_update_or_create_trigger';

export const getCreateRulesBeforeUpdateOrCreateTriggerQuery = () => {
  return TriggerQueryBuilderHelper.createTrigger({
    name: RULES_BEFORE_UPDATE_OR_CREATE_TRIGGER_NAME,
    fireMode: psqlTriggerFireMode.BEFORE,
    events: [
      psqlTriggerEvents.INSERT,
      { name: psqlTriggerEvents.UPDATE, of: ['"table"', '"column"'] },
    ],
    forEachMode: psqlTriggerForEachMode.ROW,
    onTable: `"${Rules.name}"`,
    functionName: RULES_BEFORE_UPDATE_OR_CREATE_TRIGGER_FUNCTION_NAME,
  });
};
