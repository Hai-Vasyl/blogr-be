import {
  IsNumberString as IsNumberStringValidator,
  ValidationOptions,
} from 'class-validator';

export function IsNumberString(
  code?: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return IsNumberStringValidator(
    {},
    {
      context: {
        message: 'Field $field should be number string',
        code,
      },
      ...validationOptions,
    },
  );
}
