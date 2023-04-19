import { ContextCodes } from '@common/enums';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

type RequestWithContext = Request & {
  contextCode: ContextCodes;
};

@Injectable()
export class SetContextCodeMiddleware implements NestMiddleware {
  public constructor(public readonly contextCode: ContextCodes) {}

  use(req: RequestWithContext, res: Response, next: NextFunction) {
    req.contextCode = this.contextCode;
    next();
  }
}
