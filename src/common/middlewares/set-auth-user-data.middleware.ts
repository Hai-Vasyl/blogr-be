import {
  ForbiddenException,
  UnauthorizedException,
} from '@common/classes/exceptions';
import { ErrorProcessable } from '@common/decorators/api';
import { ErrorCodes } from '@common/enums';
import { MiddlewareConsumerParam } from '@common/helpers';
import { AuthService, JwtTokenPayload } from '@modules/auth/auth.service';
import { User } from '@modules/users/user.entity';
import { UserRepository } from '@modules/users/user.repository';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export type RequestAuth = Request & {
  isAuth: boolean;
  user: User;
};

@Injectable()
class SetAuthUserDataMiddleware implements NestMiddleware {
  public constructor(
    private readonly authService: AuthService,
    private readonly userRepository: UserRepository,
  ) {}

  private async verifyAuth(auth: string): Promise<JwtTokenPayload> {
    const token = auth.split(' ')[1];

    try {
      return await this.authService.verifyJwtToken(token);
    } catch (error) {
      throw new ForbiddenException({
        message: error.message,
        code: ErrorCodes.AUTH_MIDDLEWARE_TOKEN_IS_EXPIRED_OR_WRONG_20001,
      });
    }
  }

  @ErrorProcessable()
  async use(req: RequestAuth, res: Response, next: NextFunction) {
    const auth = req.headers.authorization;

    if (!auth) {
      req.isAuth = false;

      return next();
    } else if (!auth.split(' ')[1]) {
      throw new ForbiddenException({
        message: 'Authorization payload is invalid',
        code: ErrorCodes.AUTH_MIDDLEWARE_PAYLOAD_IS_INVALID_10001,
      });
    }

    const { sub: userId } = await this.verifyAuth(auth);

    const user = await this.userRepository.findOne({
      where: { userId },
      relations: ['role', 'role.permissions'],
    });

    if (!user) {
      throw new ForbiddenException({
        message: 'User does not exist with Id specified in access token',
        code: ErrorCodes.AUTH_MIDDLEWARE_TOKEN_SUB_IS_INVALID_30055,
      });
    }

    req.isAuth = true;
    req.user = user;

    next();
  }
}

export const SetAuthUserDataProvider: MiddlewareConsumerParam = {
  middlewares: SetAuthUserDataMiddleware,
  routes: '*',
};
