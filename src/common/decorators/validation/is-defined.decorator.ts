import {
  IsDefined as IsDefinedValidator,
  ValidationOptions,
} from 'class-validator';

export function IsDefined(
  code?: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return IsDefinedValidator({
    context: {
      message: 'Field $field should be defined',
      code,
    },
    ...validationOptions,
  });
}
