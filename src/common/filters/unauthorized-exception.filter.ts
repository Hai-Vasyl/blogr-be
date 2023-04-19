import { UnauthorizedException } from '@common/classes/exceptions';
import { ErrorCodes } from '@common/enums';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter
  implements ExceptionFilter<UnauthorizedException>
{
  public catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const { contextCode } = request;
    const {
      message: { message, code = ErrorCodes.DEFAULT_UNAUTHORIZED },
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

export const UnauthorizedExceptionFilterProvider = {
  provide: APP_FILTER,
  useClass: UnauthorizedExceptionFilter,
};
