import {
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationOptions,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { UserRepository } from '@modules/users/user.repository';
import { LoginMethods } from '@modules/users/enums/login-method.enum';

@Injectable()
@ValidatorConstraint({ name: 'DoesUserAlreadyExistWithEmail', async: true })
export class DoesUserAlreadyExistWithEmailConstraint
  implements ValidatorConstraintInterface
{
  constructor(private readonly userRepository: UserRepository) {}

  async validate(email: string, args: ValidationArguments) {
    return !Boolean(
      await this.userRepository.findOne({
        where: { email, loginMethod: LoginMethods.LOCAL },
      }),
    );
  }
}

export function DoesUserAlreadyExistWithEmail(
  code?: number,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return Validate(DoesUserAlreadyExistWithEmailConstraint, {
    context: {
      message: 'User with field $field already exists',
      code,
    },
    ...validationOptions,
  });
}
