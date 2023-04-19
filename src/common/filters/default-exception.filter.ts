import { DefaultException } from '@common/classes/exceptions';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Catch(DefaultException)
export class DefaultExceptionFilter
  implements ExceptionFilter<DefaultException>
{
  public catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const { contextCode } = request;
    const { message, statusCode, error, code } = exception;

    response.status(statusCode).json({
      contextCode,
      statusCode,
      error,
      message,
      code,
    });
  }
}

export const DefaultExceptionFilterProvider = {
  provide: APP_FILTER,
  useClass: DefaultExceptionFilter,
};
