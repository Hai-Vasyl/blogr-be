import {
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@modules/users/user.repository';

@Injectable()
@ValidatorConstraint({ name: 'DoesUserExistWithId', async: true })
export class DoesUserExistWithIdConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userRepository: UserRepository) {}

  async validate(userId: string, args: ValidationArguments) {
    return Boolean(
      await this.userRepository.findOne({
        where: { userId },
      }),
    );
  }
}

export function DoesUserExistWithId(
  code?: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return Validate(DoesUserExistWithIdConstraint, {
    context: {
      message: "User with field $field doesn't exist",
      code,
    },
    ...validationOptions,
  });
}
