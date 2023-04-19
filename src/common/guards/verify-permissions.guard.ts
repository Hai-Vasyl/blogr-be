import { UnauthorizedException } from '@common/classes/exceptions';
import { ErrorProcessable, PERMISSION_KEY } from '@common/decorators/api';
import { ErrorCodes } from '@common/enums';
import { RequestAuth } from '@common/middlewares';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { APP_GUARD, Reflector } from '@nestjs/core';

@Injectable()
export class VerifyPermissionsGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  @ErrorProcessable()
  canActivate(context: ExecutionContext): boolean {
    const permission = this.reflector.get<string>(
      PERMISSION_KEY,
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest() as RequestAuth;

    if (!permission) {
      return true;
    } else if (!request.isAuth && permission) {
      throw new UnauthorizedException({
        message: 'Access to the route is prohibited',
        code: ErrorCodes.AUTH_GUARD_ACCESS_PROHIBITED_20002,
      });
    } else if (request.isAuth && permission) {
      if (request.user.role.isSuperAdmin) {
        return true;
      }

      const doesPermissionExist = request.user.role.permissions.some(
        (permission) => permission,
      );

      if (!doesPermissionExist) {
        throw new UnauthorizedException({
          message: 'Access is denied, the required permission was not provided',
          code: ErrorCodes.AUTH_GUARD_ACCESS_DENIED_NO_REQUIRED_PERMISSION_PROVIDED_20003,
        });
      }
    }

    return true;
  }
}

export const VerifyPermissionsGuardProvider = {
  provide: APP_GUARD,
  useClass: VerifyPermissionsGuard,
};
