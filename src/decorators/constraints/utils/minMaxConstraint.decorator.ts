import { applyDecorators } from '@nestjs/common';
import { MinLength, MaxLength } from 'class-validator';
import { getLengthValidationMsg } from 'src/modules/auth/utils/getLengthValidationMsg';

interface IMinMaxConstraintParams {
  min: number;
  max: number;
  entityName: string;
}

export function MinMaxConstraint({
  min,
  max,
  entityName,
}: IMinMaxConstraintParams) {
  return applyDecorators(
    MinLength(min, {
      message: (validationArguments) => {
        if (!validationArguments.value?.length) {
          return `${entityName} must be provided`;
        }

        return getLengthValidationMsg(entityName, min, 'min');
      },
    }),
    MaxLength(max, {
      message: (validationArguments) => {
        if (validationArguments.value?.length) {
          return getLengthValidationMsg(entityName, max, 'max');
        }
      },
    }),
  );
}
