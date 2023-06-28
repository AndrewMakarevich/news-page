import { psqlFunctionParameterMode } from './getCreatePsqlFunctionQuery';

interface IPsqlFunctionBaseParameter {
  mode?:
    | psqlFunctionParameterMode.IN
    | psqlFunctionParameterMode.INOUT
    | psqlFunctionParameterMode.VARIADIC;
  name?: string;
  type: string;
  defaultValue?: string;
}

interface IPsqlFunctionINParameter {
  mode: psqlFunctionParameterMode.OUT;
  name?: string;
  type: string;
  defaultValue?: undefined;
}

type IPsqlFunctionParameter =
  | IPsqlFunctionBaseParameter
  | IPsqlFunctionINParameter;

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
