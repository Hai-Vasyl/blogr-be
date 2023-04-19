import { ContextCodes } from '@common/enums';
import { MiddlewareConsumerParam } from '@common/helpers';
import { SetContextCodeMiddleware } from '@common/middlewares/set-context-code.middleware';
import { Injectable } from '@nestjs/common';

@Injectable()
class SetContextCodeDefaultMiddleware extends SetContextCodeMiddleware {
  public constructor() {
    super(ContextCodes.DEFAULT);
  }
}

export const ContextCodeDefaultProvider: MiddlewareConsumerParam = {
  middlewares: SetContextCodeDefaultMiddleware,
  routes: '*',
};
