import {
  ValidateNested as ValidateNestedDecorator,
  ValidationOptions,
} from 'class-validator';

export function ValidateNested(
  code?: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateNestedDecorator({
    each: true,
    context: {
      message: 'Field $field must include object',
      code,
    },
    ...validationOptions,
  });
}
