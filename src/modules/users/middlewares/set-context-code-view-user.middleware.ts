import { ContextCodes } from '@common/enums';
import { MiddlewareConsumerParam } from '@common/helpers';
import { SetContextCodeMiddleware } from '@common/middlewares';
import { Injectable } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common/enums';

@Injectable()
class SetContextCodeViewUserMiddleware extends SetContextCodeMiddleware {
  public constructor() {
    super(ContextCodes.VIEW_USER);
  }
}

export const ContextCodeViewUserProvider: MiddlewareConsumerParam = {
  middlewares: SetContextCodeViewUserMiddleware,
  routes: { path: 'users/:userId', method: RequestMethod.GET },
};
