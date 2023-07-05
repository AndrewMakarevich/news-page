import {
  IDropPsqlFunctionParams,
  IGetCreatePsqlFunctionQuery,
  IPsqlFunctionSetOfReturnType,
  IPsqlFunctionTableReturnType,
} from './functionQueryBuilderHelper.interface';

export class FunctionQueryBuilderHelper {
  private static returnValueTypeIsSetOf = (
    returnValue: any,
  ): returnValue is IPsqlFunctionSetOfReturnType => {
    return returnValue?.setOf !== undefined;
  };

  private static returnValueTypeIsTable = (
    returnValue: any,
  ): returnValue is IPsqlFunctionTableReturnType => {
    return (
      returnValue?.[0]?.columnName !== undefined &&
      returnValue?.[0]?.columnType !== undefined
    );
  };

  static createFunction({
    name,
    parameters = [],
    returnType,
    logic,
    language,
  }: IGetCreatePsqlFunctionQuery) {
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
    } else if (this.returnValueTypeIsSetOf(returnType)) {
      returnTypeValue = ` RETURNS SETOF ${returnType.setOf}`;
    } else if (this.returnValueTypeIsTable(returnType)) {
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
  }

  static dropFunction({ functions, cascade }: IDropPsqlFunctionParams) {
    const parsedFunctions = functions.map(({ name, args }) => {
      return `${name}${args ? `(${args.join(',')})` : ''}`;
    });

    const dropQuery = `DROP FUNCTION IF EXISTS ${parsedFunctions.join(',')} ${
      cascade ? 'CASCADE' : ''
    };`;

    return dropQuery;
  }
}
