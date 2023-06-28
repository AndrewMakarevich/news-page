interface IGetDropPsqlTriggerQuery {
  name: string;
  tableName: string;
  cascade?: boolean;
}

export const getDropPsqlTriggerQuery = ({
  name,
  tableName,
  cascade,
}: IGetDropPsqlTriggerQuery) => {
  return `DROP IF EXISTS TRIGGER ${name} ON ${tableName} ${
    cascade ? 'CASCADE' : ''
  };`;
};
