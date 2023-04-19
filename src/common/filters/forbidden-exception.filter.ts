import { ForbiddenException } from '@common/classes/exceptions';
import { ErrorCodes } from '@common/enums';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter
  implements ExceptionFilter<ForbiddenException>
{
  public catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const { contextCode } = request;
    const {
      message: { message, code = ErrorCodes.DEFAULT_FORBIDDEN },
      statusCode,
      error,
    } = exception;

    response.status(statusCode).json({
      contextCode,
      statusCode,
      error,
      message,
      code,
    });
  }
}

export const ForbiddenExceptionFilterProvider = {
  provide: APP_FILTER,
  useClass: ForbiddenExceptionFilter,
};
