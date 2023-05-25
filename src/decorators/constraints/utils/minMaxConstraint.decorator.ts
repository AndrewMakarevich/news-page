import { applyDecorators } from '@nestjs/common';
import { MinLength, MaxLength } from 'class-validator';

interface IMinMaxConstraintParams {
  min: number;
  max: number;
  entityName: string;
}

export function getLengthValidationMsg(
  entityName: string,
  validEntityLength: number,
  validationType: 'min' | 'max',
) {
  switch (validationType) {
    case 'min':
      return `${entityName} is too short, minimum length is ${validEntityLength}`;
    case 'max':
      return `${entityName} is too long, maximum length is ${validEntityLength}`;
    default:
      return '';
  }
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

        return '';
      },
    }),
  );
}
