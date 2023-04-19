import {
  IsEmail as IsEmailValidator,
  ValidationOptions,
} from 'class-validator';

export function IsEmail(
  code?: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return IsEmailValidator(
    {},
    {
      context: {
        message: 'Field $field is not correct email',
        code,
      },
      ...validationOptions,
    },
  );
}
