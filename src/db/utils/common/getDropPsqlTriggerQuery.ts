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
  return `DROP TRIGGER IF EXISTS ${name} ON ${tableName} ${
    cascade ? 'CASCADE' : ''
  };`;
};
