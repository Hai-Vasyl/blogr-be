import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { ConflictException } from '@nestjs/common/exceptions';
import { APP_FILTER } from '@nestjs/core';
import express from 'express';

@Catch(ConflictException)
export class ConflictExceptionFilter
  implements ExceptionFilter<ConflictException>
{
  public catch(exception, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const { statusCode, error, message: messages } = exception.response;

    response.status(exception.status).json({
      statusCode,
      error,
      messages,
    });
  }
}

export const ConflictExceptionFilterProvider = {
  provide: APP_FILTER,
  useClass: ConflictExceptionFilter,
};
