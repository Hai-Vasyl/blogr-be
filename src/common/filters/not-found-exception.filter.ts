import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { APP_FILTER } from '@nestjs/core';
import express from 'express';

@Catch(NotFoundException)
export class NotFoundExceptionFilter
  implements ExceptionFilter<NotFoundException>
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

export const NotFoundExceptionFilterProvider = {
  provide: APP_FILTER,
  useClass: NotFoundExceptionFilter,
};
