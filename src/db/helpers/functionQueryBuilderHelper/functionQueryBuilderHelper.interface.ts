import { psqlFunctionParameterMode } from './functionQueryBuilderHelper.const';

interface IPsqlFunctionBaseParameter {
  mode?:
    | psqlFunctionParameterMode.IN
    | psqlFunctionParameterMode.INOUT
    | psqlFunctionParameterMode.VARIADIC;
  name?: string;
  type: string;
  defaultValue?: string;
}

interface IPsqlFunctionOUTParameter {
  mode: psqlFunctionParameterMode.OUT;
  name?: string;
  type: string;
  defaultValue?: undefined;
}

type IPsqlFunctionParameter =
  | IPsqlFunctionBaseParameter
  | IPsqlFunctionOUTParameter;

export type IPsqlFunctionTableReturnType = {
  columnName: string;
  columnType: string;
}[];

export type IPsqlFunctionSetOfReturnType = {
  setOf: string;
};

export interface IGetCreatePsqlFunctionQuery {
  name: string;
  parameters?: IPsqlFunctionParameter[];
  returnType?:
    | string
    | IPsqlFunctionTableReturnType
    | IPsqlFunctionSetOfReturnType;
  logic: string;
  language: string;
}

interface IFunctionObj {
  name: string;
  args?: string[];
}

export interface IDropPsqlFunctionParams {
  functions: IFunctionObj[];
  cascade?: boolean;
}
