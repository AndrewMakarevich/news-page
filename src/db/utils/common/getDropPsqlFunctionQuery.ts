interface IFunctionObj {
  name: string;
  args?: string[];
}

interface IDropPostgresFunctionParams {
  functions: IFunctionObj[];
  cascade?: boolean;
}

export const getDropPsqlFunctionQuery = ({
  functions,
  cascade,
}: IDropPostgresFunctionParams) => {
  const parsedFunctions = functions.map(({ name, args }) => {
    return `${name}${args ? `(${args.join(',')})` : ''}`;
  });

  const dropQuery = `DROP FUNCTION IF EXISTS ${parsedFunctions.join(',')} ${
    cascade ? 'CASCADE' : ''
  };`;

  return dropQuery;
};
