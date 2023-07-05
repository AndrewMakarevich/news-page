import {
  IGetCreatePsqlTriggerQuery,
  IGetDropPsqlTriggerQuery,
} from './triggerQueryBuilderHelper.interface';

export class TriggerQueryBuilderHelper {
  static createTrigger({
    constraint,
    name,
    fireMode,
    events,
    onTable,
    forEachMode,
    condition,
    functionName,
    functionArguments = [],
  }: IGetCreatePsqlTriggerQuery) {
    const constraintCondition = constraint ? ' CONSTRAINT' : '';
    const triggerEvents = events
      .map((event) => {
        if (typeof event === 'string') {
          return event;
        }

        return `${event.name} OF ${event.of.join(', ')}`;
      })
      .join(' OR ');
    const whenCondition = condition ? `WHEN (${condition})` : '';
    const functionArgumentsValue = functionArguments.join(', ');

    return `CREATE OR REPLACE${constraintCondition} TRIGGER ${name}
    ${fireMode} ${triggerEvents} ON ${onTable} 
      FOR EACH ${forEachMode}
      ${whenCondition} EXECUTE FUNCTION ${functionName}(${functionArgumentsValue});`;
  }

  static dropTrigger({ name, tableName, cascade }: IGetDropPsqlTriggerQuery) {
    return `DROP TRIGGER IF EXISTS ${name} ON ${tableName} ${
      cascade ? 'CASCADE' : ''
    };`;
  }
}
