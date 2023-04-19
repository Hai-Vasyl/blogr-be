import {
  MinLength as MinLengthValidator,
  ValidationOptions,
} from 'class-validator';

export function MinLength(
  min: number,
  code?: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return MinLengthValidator(min, {
    context: {
      message: `Field $field must contain at least ${min} characters`,
      code,
    },
    ...validationOptions,
  });
}
