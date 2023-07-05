import {
  psqlTriggerEvents,
  psqlTriggerFireMode,
  psqlTriggerForEachMode,
} from './triggerQueryBuilderHelper.const';

export interface IGetCreatePsqlTriggerQuery {
  constraint?: boolean;
  name: string;
  fireMode: psqlTriggerFireMode;
  events: (
    | psqlTriggerEvents
    | { name: psqlTriggerEvents.UPDATE; of: string[] }
  )[];
  onTable: string;
  forEachMode: psqlTriggerForEachMode;
  condition?: string;
  functionName: string;
  functionArguments?: string[];
}

export interface IGetDropPsqlTriggerQuery {
  name: string;
  tableName: string;
  cascade?: boolean;
}
