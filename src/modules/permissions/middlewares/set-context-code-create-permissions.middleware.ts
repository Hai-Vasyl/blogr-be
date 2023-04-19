import { ContextCodes } from '@common/enums';
import { MiddlewareConsumerParam } from '@common/helpers';
import { SetContextCodeMiddleware } from '@common/middlewares';
import { Injectable } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common/enums';

@Injectable()
class SetContextCodeCreatePermissionsMiddleware extends SetContextCodeMiddleware {
  public constructor() {
    super(ContextCodes.POST_PERMISSIONS);
  }
}

export const ContextCodeCreatePermissionsProvider: MiddlewareConsumerParam = {
  middlewares: SetContextCodeCreatePermissionsMiddleware,
  routes: { path: 'permissions', method: RequestMethod.POST },
};
