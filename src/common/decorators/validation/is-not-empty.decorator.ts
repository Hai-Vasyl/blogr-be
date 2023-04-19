import {
  IsNotEmpty as IsNotEmptyValidator,
  ValidationOptions,
} from 'class-validator';

export function IsNotEmpty(
  code?: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return IsNotEmptyValidator({
    context: {
      message: 'Field $field must not be empty',
      code,
    },
    ...validationOptions,
  });
}
