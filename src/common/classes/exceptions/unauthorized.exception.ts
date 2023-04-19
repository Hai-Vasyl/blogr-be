import { HttpStatus } from '@nestjs/common';
import { BaseException } from '@common/classes/exceptions/base.exception';

export type UnauthorizedExceptionMessage = {
  code: number;
  message: string;
};

export class UnauthorizedException extends BaseException {
  public statusCode = HttpStatus.UNAUTHORIZED;
  public error = UnauthorizedException.name;

  public constructor(message: UnauthorizedExceptionMessage) {
    super(message);
  }
}
