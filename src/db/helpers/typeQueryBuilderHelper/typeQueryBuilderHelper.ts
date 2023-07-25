import { psqlCreateTypeForms } from './typeQueryBuilderHelper.const';
import {
  IGetCreatePsqlEnumTypeQuery,
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

    return `CREATE TYPE ${name} ${typeForm}(${typeValues});`;
  }

  static createEnumType({
    name,
    values,
  }: Omit<IGetCreatePsqlEnumTypeQuery, 'asForm'>) {
    return this.createType({ name, values, asForm: psqlCreateTypeForms.ENUM });
  }

  static dropType({ types, cascade }: IGetDropPsqlTypeQuery) {
    let typesNames = '';

    if (this.typesAreStringArray(types)) {
      typesNames = types.join(', ');
    } else {
      typesNames = types;
    }

    return `DROP TYPE IF EXISTS ${typesNames} ${cascade ? 'CASCADE' : ''};`;
  }

  private static typesAreStringArray(types: any): types is readonly string[] {
    return types.length !== undefined && typeof types[0] === 'string';
  }
}
