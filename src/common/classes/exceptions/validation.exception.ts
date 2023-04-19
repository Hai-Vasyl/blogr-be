import { BaseException } from '@common/classes/exceptions/base.exception';
import { HttpStatus } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';

export type ValidationExceptionMessage = {
  property: string;
  constraint: string;
  code: number;
  message: string;
};

export class ValidationException extends BaseException {
  public statusCode = HttpStatus.BAD_REQUEST;
  public error = BadRequestException.name;

  public constructor(
    message: ValidationExceptionMessage | ValidationExceptionMessage[],
  ) {
    super(message);
  }
}
