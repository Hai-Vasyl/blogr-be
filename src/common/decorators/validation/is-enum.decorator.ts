import { IsEnum as IsEnumValidator, ValidationOptions } from 'class-validator';

export function IsEnum(
  entity: object,
  code?: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return IsEnumValidator(entity, {
    context: {
      message: 'Field $field should be enum',
      code,
    },
    ...validationOptions,
  });
}
