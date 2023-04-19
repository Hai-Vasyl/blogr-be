import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import {
  ValidationExceptionFilterProvider,
  ConflictExceptionFilterProvider,
  ForbiddenExceptionFilterProvider,
  NotFoundExceptionFilterProvider,
  UnauthorizedExceptionFilterProvider,
  UnprocessableEntityExceptionFilterProvider,
  DatabaseExceptionFilterProvider,
} from '@common/filters';
import { DefaultExceptionFilterProvider } from '@common/filters/default-exception.filter';
import { mapMiddlewares } from '@common/helpers';
import {
  ContextCodeDefaultProvider,
  SetAuthUserDataProvider,
} from '@common/middlewares';
import { ContextCodeCreatePermissionsProvider } from '@modules/permissions/middlewares/set-context-code-create-permissions.middleware';
import { PermissionsModule } from '@modules/permissions/permissions.module';
import { ContextCodeCreateRoleProvider } from '@modules/roles/middlewares/set-context-code-create-role.middleware';
import { RolesModule } from '@modules/roles/roles.module';
import { UserModule } from '@modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { commonConfig } from '@src/configs/common.config';
import { databaseConfig } from '@src/configs/database.config';
import { ContextCodeCreateUserProvider } from '@modules/users/middlewares/set-context-code-create-user.middleware';
import { ContextCodeLoginUserProvider } from '@modules/users/middlewares/set-context-code-login-user.middleware';
import { AuthModule } from '@modules/auth/auth.module';
import { VerifyPermissionsGuardProvider } from '@common/guards';
import { ContextCodeViewUserProvider } from '@modules/users/middlewares/set-context-code-view-user.middleware';
import { ContextCodeViewPermissionsProvider } from '@modules/permissions/middlewares/set-context-code-view-permissions.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
      load: [commonConfig, databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),
    AuthModule,
    PermissionsModule,
    RolesModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ValidationExceptionFilterProvider,
    DefaultExceptionFilterProvider,
    DatabaseExceptionFilterProvider,
    ConflictExceptionFilterProvider,
    ForbiddenExceptionFilterProvider,
    NotFoundExceptionFilterProvider,
    UnauthorizedExceptionFilterProvider,
    UnprocessableEntityExceptionFilterProvider,
    VerifyPermissionsGuardProvider,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    mapMiddlewares(consumer, [
      ContextCodeDefaultProvider,
      ContextCodeCreatePermissionsProvider,
      ContextCodeCreateRoleProvider,
      ContextCodeCreateUserProvider,
      ContextCodeLoginUserProvider,
      ContextCodeViewUserProvider,
      ContextCodeViewPermissionsProvider,
      SetAuthUserDataProvider,
    ]);
  }
}
