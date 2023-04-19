import { ContextCodes } from '@common/enums';
import { MiddlewareConsumerParam } from '@common/helpers';
import { SetContextCodeMiddleware } from '@common/middlewares';
import { Injectable } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common/enums';

@Injectable()
class SetContextCodeViewPermissionsMiddleware extends SetContextCodeMiddleware {
  public constructor() {
    super(ContextCodes.POST_PERMISSIONS);
  }
}

export const ContextCodeViewPermissionsProvider: MiddlewareConsumerParam = {
  middlewares: SetContextCodeViewPermissionsMiddleware,
  routes: { path: 'permissions', method: RequestMethod.GET },
};
