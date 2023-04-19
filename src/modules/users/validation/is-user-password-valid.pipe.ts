import * as bcrypt from 'bcrypt';
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

import { UserRepository } from '@modules/users/user.repository';
import { LoginMethods } from '@modules/users/enums/login-method.enum';
import { ValidationException } from '@common/classes/exceptions';
import { ErrorCodes } from '@common/enums';
import { AuthService } from '@modules/auth/auth.service';

type ObjectDTO = any & {
  email: string;
  password: string;
};

@Injectable()
export class IsUserPasswordValidPipe implements PipeTransform {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  async transform(value: ObjectDTO, metadata: ArgumentMetadata) {
    const { email, password } = value;

    const user = await this.userRepository.findOne({
      where: { email, loginMethod: LoginMethods.LOCAL },
    });

    const isPasswordValid = this.authService.comparePasswordHash(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new ValidationException({
        message: 'Password is wrong for the specified user',
        property: 'password',
        constraint: IsUserPasswordValidPipe.name,
        code: ErrorCodes.FIELD_USER_PASSWORD_IS_WRONG_FOR_USER_30042,
      });
    }

    return value;
  }
}
