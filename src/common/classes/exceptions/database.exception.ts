import { HttpStatus, BadGatewayException } from '@nestjs/common';
import { BaseException } from '@common/classes/exceptions/base.exception';
import { ErrorCodes } from '@common/enums';

export class DatabaseException extends BaseException {
  public statusCode = HttpStatus.BAD_GATEWAY;
  public error = BadGatewayException.name;
  public code = ErrorCodes.DEFAULT_DATABASE;

  public constructor(message: string) {
    super(message);
  }
}
