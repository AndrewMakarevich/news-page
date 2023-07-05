import { psqlCreateTypeForms } from './typeQueryBuilderHelper.const';
import {
  IGetCreatePsqlTypeQuery,
  IGetDropPsqlTypeQuery,
} from './typeQueryBuilderHelper.interface';

export class TypeQueryBuilderHelper {
  static createType({ name, asForm, values }: IGetCreatePsqlTypeQuery) {
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
  }

  static dropType({ name, cascade }: IGetDropPsqlTypeQuery) {
    return `DROP TYPE IF EXISTS ${name} ${cascade ? 'CASCADE' : ''};`;
  }
}
