import {
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { RoleRepository } from '@modules/roles/role.repository';

@Injectable()
@ValidatorConstraint({ name: 'DoesRoleExistWithId', async: true })
export class DoesRoleExistWithIdConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly roleRepository: RoleRepository) {}

  async validate(roleId: string, args: ValidationArguments) {
    return Boolean(
      await this.roleRepository.findOne({
        where: { roleId },
      }),
    );
  }
}

export function DoesRoleExistWithId(
  code?: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return Validate(DoesRoleExistWithIdConstraint, {
    context: {
      message: "Role with field $field doesn't exist",
      code,
    },
    ...validationOptions,
  });
}
