import {
  IGetCreatePsqlFunctionQuery,
  IPsqlFunctionSetOfReturnType,
  IPsqlFunctionTableReturnType,
} from './getCreatePsqlFunctionQuery.interface';

export enum psqlFunctionParameterMode {
  IN = 'IN',
  OUT = 'OUT',
  INOUT = 'INOUT',
  VARIADIC = 'VARIADIC',
}

const returnValueTypeIsSetOf = (
  returnValue: any,
): returnValue is IPsqlFunctionSetOfReturnType => {
  return returnValue?.setOf !== undefined;
};

const returnValueTypeIsTable = (
  returnValue: any,
): returnValue is IPsqlFunctionTableReturnType => {
  return (
    returnValue?.[0]?.columnName !== undefined &&
    returnValue?.[0]?.columnType !== undefined
  );
};

export const getCreatePsqlFunctionQuery = ({
  name,
  parameters = [],
  returnType,
  logic,
  language,
}: IGetCreatePsqlFunctionQuery) => {
  const functionParameters = parameters
    .map(({ mode, name, type, defaultValue }) => {
      const modeValue = mode ? `${mode} ` : '';
      const nameValue = name ? `${name} ` : '';
      defaultValue = defaultValue ? `=${defaultValue}` : '';

      return `${modeValue}${nameValue}${type}${defaultValue}`;
    })
    .join(', ');

  let returnTypeValue = returnType ? returnType : '';

  if (typeof returnType === 'string') {
    returnTypeValue = ` RETURNS ${returnType}`;
  } else if (returnValueTypeIsSetOf(returnType)) {
    returnTypeValue = ` RETURNS SETOF ${returnType.setOf}`;
  } else if (returnValueTypeIsTable(returnType)) {
    const stringifiedReturnType = returnType
      .map(({ columnName, columnType }) => {
        return `${columnName} ${columnType}`;
      })
      .join(', ');

    returnTypeValue = ` RETURNS TABLE (${stringifiedReturnType})`;
  }

  return `CREATE OR REPLACE FUNCTION ${name}(${functionParameters})
${returnTypeValue} AS $$
  ${logic}
 $$ LANGUAGE ${language};`;
};
