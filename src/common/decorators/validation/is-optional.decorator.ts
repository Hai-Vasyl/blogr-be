import {
  IsOptional as IsOptionalValidator,
  ValidationOptions,
} from 'class-validator';

export function IsOptional(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return IsOptionalValidator(validationOptions);
}
