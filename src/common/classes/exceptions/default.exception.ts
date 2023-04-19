import { HttpStatus, InternalServerErrorException } from '@nestjs/common';
import { BaseException } from '@common/classes/exceptions/base.exception';
import { ErrorCodes } from '@common/enums';

export class DefaultException extends BaseException {
  public statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  public error = InternalServerErrorException.name;
  public code = ErrorCodes.DEFAULT_SERVER;

  public constructor(message: string) {
    super(message);
  }
}
