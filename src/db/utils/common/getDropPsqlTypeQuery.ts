interface IGetDropPsqlTypeQuery {
  name: string;
  cascade?: boolean;
}

export const getDropPsqlTypeQuery = ({
  name,
  cascade,
}: IGetDropPsqlTypeQuery) => {
  return `DROP TYPE IF EXISTS ${name} ${cascade ? 'CASCADE' : ''};`;
};
