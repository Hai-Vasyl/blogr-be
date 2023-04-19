import { IsUUID as IsUUIDValidator, ValidationOptions } from 'class-validator';

export function IsUUID(
  code?: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return IsUUIDValidator('4', {
    context: {
      message: 'Field $field should be UUID',
      code,
    },
    ...validationOptions,
  });
}
