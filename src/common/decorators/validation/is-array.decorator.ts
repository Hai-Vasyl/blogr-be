import {
  IsArray as IsArrayValidator,
  ValidationOptions,
} from 'class-validator';

export function IsArray(
  code?: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return IsArrayValidator({
    context: {
      message: 'Field $field must be array',
      code,
    },
    ...validationOptions,
  });
}
