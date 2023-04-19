import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { UnprocessableEntityException } from '@nestjs/common/exceptions';
import { APP_FILTER } from '@nestjs/core';
import express from 'express';

@Catch(UnprocessableEntityException)
export class UnprocessableEntityExceptionFilter
  implements ExceptionFilter<UnprocessableEntityException>
{
  public catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse() as express.Response;

    const { statusCode, error, message: messages } = exception.response;

    response.status(exception.status).json({
      statusCode,
      error,
      messages,
    });
  }
}

export const UnprocessableEntityExceptionFilterProvider = {
  provide: APP_FILTER,
  useClass: UnprocessableEntityExceptionFilter,
};
