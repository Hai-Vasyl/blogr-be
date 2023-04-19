import {
  IsString as IsStringValidator,
  ValidationOptions,
} from 'class-validator';

export function IsString(
  code?: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return IsStringValidator({
    context: {
      message: 'Field $field should be string',
      code,
    },
    ...validationOptions,
  });
}
