import {
  MaxLength as MaxLengthValidator,
  ValidationOptions,
} from 'class-validator';

export function MaxLength(
  max: number,
  code?: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return MaxLengthValidator(max, {
    context: {
      message: `Field $field must contain less than ${max} characters`,
      code,
    },
    ...validationOptions,
  });
}
