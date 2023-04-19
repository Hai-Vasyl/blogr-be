import { ContextCodes } from '@common/enums';
import { MiddlewareConsumerParam } from '@common/helpers';
import { SetContextCodeMiddleware } from '@common/middlewares';
import { Injectable } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common/enums';

@Injectable()
class SetContextCodeCreateUserMiddleware extends SetContextCodeMiddleware {
  public constructor() {
    super(ContextCodes.POST_USER);
  }
}

export const ContextCodeCreateUserProvider: MiddlewareConsumerParam = {
  middlewares: SetContextCodeCreateUserMiddleware,
  routes: { path: 'users', method: RequestMethod.POST },
};
