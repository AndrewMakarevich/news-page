interface functionObj {
  name: string;
  args?: string[];
}

interface IDropPostgresFunctionParams {
  functions: functionObj[];
  cascade?: boolean;
}

export const returnDropPostgresFunctionQuery = ({
  functions,
  cascade,
}: IDropPostgresFunctionParams) => {
  const parsedFunctions = functions.map(({ name, args }) => {
    return `${name}${args ? `(${args.join(',')})` : ''}`;
  });

  const dropQuery = `drop function if exists ${parsedFunctions.join(',')} ${
    cascade ? 'cascade' : ''
  };`;

  return dropQuery;
};
