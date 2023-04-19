import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/classes/exceptions/base.exception';

export type ForbiddenExceptionMessage = {
  code: number;
  message: string;
};

export class ForbiddenException extends BaseException {
  public statusCode = HttpStatus.FORBIDDEN;
  public error = ForbiddenException.name;

  public constructor(message: ForbiddenExceptionMessage) {
    super(message);
  }
}
