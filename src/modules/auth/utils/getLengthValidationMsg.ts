export function getLengthValidationMsg(
  entityName: string,
  validEntityLength: number,
  validationType: 'min' | 'max',
) {
  switch (validationType) {
    case 'min':
      return `${entityName} is too short, minimun length is ${validEntityLength}`;
    case 'max':
      return `${entityName} is too long, maximum length is ${validEntityLength}`;
    default:
      return '';
  }
}
