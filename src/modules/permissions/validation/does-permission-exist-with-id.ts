import {
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PermissionRepository } from '@modules/permissions/permission.repository';

@Injectable()
@ValidatorConstraint({ name: 'DoesPermissionExistWithId', async: true })
export class DoesPermissionExistWithIdConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async validate(permissionId: string, args: ValidationArguments) {
    return Boolean(
      await this.permissionRepository.findOne({
        where: { permissionId },
      }),
    );
  }
}

export function DoesPermissionExistWithId(
  code?: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return Validate(DoesPermissionExistWithIdConstraint, {
    context: {
      message: "Permission with field $field doesn't exist",
      code,
    },
    ...validationOptions,
  });
}
