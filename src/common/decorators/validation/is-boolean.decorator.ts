import {
  IsBoolean as IsBooleanValidator,
  ValidationOptions,
} from 'class-validator';

export function IsBoolean(
  code?: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return IsBooleanValidator({
    context: {
      message: 'Field $field should be boolean',
      code,
    },
    ...validationOptions,
  });
}
