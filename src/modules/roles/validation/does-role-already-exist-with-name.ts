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
@ValidatorConstraint({ name: 'DoesRoleAlreadyExistWithName', async: true })
export class DoesRoleAlreadyExistWithNameConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly roleRepository: RoleRepository) {}

  async validate(name: string, args: ValidationArguments) {
    return !Boolean(
      await this.roleRepository.findOne({
        where: { name },
      }),
    );
  }
}

export function DoesRoleAlreadyExistWithName(
  code?: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return Validate(DoesRoleAlreadyExistWithNameConstraint, {
    context: {
      message: 'Role with field $field already exists',
      code,
    },
    ...validationOptions,
  });
}
