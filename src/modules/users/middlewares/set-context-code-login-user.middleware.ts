import { ContextCodes } from '@common/enums';
import { MiddlewareConsumerParam } from '@common/helpers';
import { SetContextCodeMiddleware } from '@common/middlewares';
import { Injectable } from '@nestjs/common';
import { RequestMethod } from '@nestjs/common/enums';

@Injectable()
class SetContextCodeLoginUserMiddleware extends SetContextCodeMiddleware {
  public constructor() {
    super(ContextCodes.LOGIN_USER);
  }
}

export const ContextCodeLoginUserProvider: MiddlewareConsumerParam = {
  middlewares: SetContextCodeLoginUserMiddleware,
  routes: { path: 'users/login', method: RequestMethod.POST },
};
