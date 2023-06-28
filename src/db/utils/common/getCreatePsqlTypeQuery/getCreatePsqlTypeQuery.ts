import { IGetCreatePsqlTypeQuery } from './getCreatePsqlTypeQuery.interface';

export enum psqlCreateTypeForms {
  COMPOSITE = 'COMPOSITE',
  ENUM = 'ENUM',
  RANGE = 'RANGE',
}

export const getCreatePsqlTypeQuery = ({
  name,
  asForm,
  values,
}: IGetCreatePsqlTypeQuery) => {
  const typeForm = asForm ? `AS ${asForm} ` : '';
  let typeValues: string;

  switch (asForm) {
    case psqlCreateTypeForms.ENUM:
      typeValues = values.map((value) => `'${value}'`).join(', ');
      break;
    case psqlCreateTypeForms.RANGE:
      typeValues = `subtype = ${values.subtype}, subtype_diff = ${values.subtypeDiffFunction}`;
      break;
    default:
      typeValues = values
        .map((value) => `${value.attributeName} ${value.dataType}`)
        .join(', ');
  }

  return `CREATE TYPE ${name} ${typeForm}(${typeValues})`;
};
