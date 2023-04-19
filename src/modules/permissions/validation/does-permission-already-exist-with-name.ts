import {
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { PermissionRepository } from '@modules/permissions/permission.repository';
import { Permissions } from '@common/enums';

@Injectable()
@ValidatorConstraint({
  name: 'DoesPermissionAlreadyExistWithName',
  async: true,
})
export class DoesPermissionAlreadyExistWithNameConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async validate(name: Permissions, args: ValidationArguments) {
    return !Boolean(
      await this.permissionRepository.findOne({
        where: { name },
      }),
    );
  }
}

export function DoesPermissionAlreadyExistWithName(
  code?: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return Validate(DoesPermissionAlreadyExistWithNameConstraint, {
    context: {
      message: 'Permission with field $field already exists',
      code,
    },
    ...validationOptions,
  });
}
