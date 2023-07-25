import { psqlCreateTypeForms } from './typeQueryBuilderHelper.const';

interface ICompositeTypeValues {
  attributeName: string;
  dataType: string;
}

interface IRangeTypeValues {
  subtype: string;
  subtypeDiffFunction: string;
}

interface IBaseGetCreatePsqlTypeQuery {
  name: string;
}

interface IGetCreatePsqlCompositeTypeQuery extends IBaseGetCreatePsqlTypeQuery {
  asForm?: psqlCreateTypeForms.COMPOSITE;
  values: readonly ICompositeTypeValues[];
}

export interface IGetCreatePsqlEnumTypeQuery
  extends IBaseGetCreatePsqlTypeQuery {
  asForm: psqlCreateTypeForms.ENUM;
  values: readonly string[];
}

interface IGetCreatePsqlRangeTypeQuery extends IBaseGetCreatePsqlTypeQuery {
  asForm: psqlCreateTypeForms.RANGE;
  values: IRangeTypeValues;
}

export type IGetCreatePsqlTypeQuery =
  | IGetCreatePsqlCompositeTypeQuery
  | IGetCreatePsqlEnumTypeQuery
  | IGetCreatePsqlRangeTypeQuery;

export interface IGetDropPsqlTypeQuery {
  types: string | readonly string[];
  cascade?: boolean;
}
