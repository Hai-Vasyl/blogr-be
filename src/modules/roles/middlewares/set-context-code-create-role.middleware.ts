import { ContextCodes } from '@common/enums';
import { MiddlewareConsumerParam } from '@common/helpers';
import { SetContextCodeMiddleware } from '@common/middlewares';
import { Injectable } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common/enums';

@Injectable()
class SetContextCodeCreateRoleMiddleware extends SetContextCodeMiddleware {
  public constructor() {
    super(ContextCodes.POST_ROLE);
  }
}

export const ContextCodeCreateRoleProvider: MiddlewareConsumerParam = {
  middlewares: SetContextCodeCreateRoleMiddleware,
  routes: { path: 'roles', method: RequestMethod.POST },
};
