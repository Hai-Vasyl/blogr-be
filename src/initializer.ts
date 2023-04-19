import {
  ValidationException,
  ValidationExceptionMessage,
} from '@common/classes/exceptions';
import { ErrorCodes } from '@common/enums/error-code.enum';
import {
  ValidationExceptionFilter,
  ConflictExceptionFilter,
  DatabaseExceptionFilter,
  ForbiddenExceptionFilter,
  NotFoundExceptionFilter,
  UnauthorizedExceptionFilter,
  UnprocessableEntityExceptionFilter,
} from '@common/filters';
import { DefaultExceptionFilter } from '@common/filters/default-exception.filter';
import { VerifyPermissionsGuard } from '@common/guards';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { AppModule } from '@src/app.module';
import { useContainer, ValidationError } from 'class-validator';

export class Initializer {
  private readonly config: any;

  public constructor(private readonly app: INestApplication) {
    const configService = app.get(ConfigService);
    this.config = configService.get('common');
  }

  private mapValidationErrors(
    errors: ValidationError[],
  ): ValidationExceptionMessage[] {
    return errors.flatMap((error) => {
      if (error.children?.length) {
        return this.mapValidationErrors(error.children);
      }

      const property = error.property || 'unknown';

      return Object.entries(error.contexts).map(([constraint, context]) => {
        const code = context.code || ErrorCodes.DEFAULT_VALIDATION;
        let message = 'Unhandled validation error happened';

        if (message) {
          message = context.message.replace('$field', `'${property}'`);
        }

        return {
          property,
          constraint,
          code,
          message,
        };
      });
    });
  }

  private initErrorFilters(): void {
    this.app.useGlobalFilters(
      new ValidationExceptionFilter(),
      new DefaultExceptionFilter(),
      new ForbiddenExceptionFilter(),
      new UnauthorizedExceptionFilter(),
      // new BadRequestExceptionFilter(),
      // new ConflictExceptionFilter(),
      // new ForbiddenExceptionFilter(),
      // new NotFoundExceptionFilter(),
      // new UnprocessableEntityExceptionFilter(),
      new DatabaseExceptionFilter(),
    );
  }

  private initGuards(): void {
    const reflector = this.app.get(Reflector);
    this.app.useGlobalGuards(new VerifyPermissionsGuard(reflector));
  }

  private initValidation(): void {
    this.app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        stopAtFirstError: true,
        validateCustomDecorators: true,
        exceptionFactory: (errors) =>
          new ValidationException(this.mapValidationErrors(errors)),
      }),
    );

    useContainer(this.app.select(AppModule), { fallbackOnErrors: true });
  }

  private async listenPort(): Promise<void> {
    await this.app.listen(this.config.port || 3000);
  }

  public async run(): Promise<void> {
    this.initErrorFilters();
    this.initGuards();
    this.initValidation();

    await this.listenPort();
  }
}
