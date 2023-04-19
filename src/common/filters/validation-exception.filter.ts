import { ValidationException } from '@common/classes/exceptions';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

@Catch(ValidationException)
export class ValidationExceptionFilter
  implements ExceptionFilter<ValidationException>
{
  public catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const { contextCode } = request;
    const { statusCode, error } = exception;
    let { message: messages } = exception;

    if (!Array.isArray(messages)) {
      messages = [messages];
    }

    response.status(statusCode).json({
      contextCode,
      statusCode,
      error,
      messages,
    });
  }
}

export const ValidationExceptionFilterProvider = {
  provide: APP_FILTER,
  useClass: ValidationExceptionFilter,
};
