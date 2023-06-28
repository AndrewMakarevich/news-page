export enum psqlTriggerFireMode {
  BEFORE = 'BEFORE',
  AFTER = 'AFTER',
  INSTEAD_OF = 'INSTEAD OF',
}

export enum psqlTriggerEvents {
  INSERT = 'INSERT',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  TRUNCATE = 'TRUNCATE',
}

export enum psqlTriggerForEachMode {
  ROW = 'ROW',
  STATEMENT = 'STATEMENT',
}

interface IGetCreatePsqlTriggerQuery {
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

export const getCreatePsqlTriggerQuery = ({
  constraint,
  name,
  fireMode,
  events,
  onTable,
  forEachMode,
  condition,
  functionName,
  functionArguments = [],
}: IGetCreatePsqlTriggerQuery) => {
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
};
