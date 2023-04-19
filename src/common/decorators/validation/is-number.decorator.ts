import {
  IsNumber as IsNumberValidator,
  ValidationOptions,
} from 'class-validator';

export function IsNumber(
  code?: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return IsNumberValidator(
    { allowNaN: false, allowInfinity: false },
    {
      context: {
        message: 'Field $field should be number',
        code,
      },
      ...validationOptions,
    },
  );
}
