import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '@modules/users/user.entity';
import { UserRepository } from '@modules/users/user.repository';
import { UsersController } from '@modules/users/users.controller';
import { UsersService } from '@modules/users/users.service';
import { RolesModule } from '@modules/roles/roles.module';
import { DoesUserAlreadyExistWithEmailConstraint } from '@modules/users/validation/does-user-already-exist-with-email';
import { DoesUserExistWithEmailConstraint } from '@modules/users/validation/does-user-exist-with-email';
import { AuthModule } from '@modules/auth/auth.module';
import { DoesUserExistWithIdConstraint } from '@modules/users/validation/does-user-exist-with-id';

@Module({
  imports: [TypeOrmModule.forFeature([User]), RolesModule, AuthModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepository,
    DoesUserAlreadyExistWithEmailConstraint,
    DoesUserExistWithEmailConstraint,
    DoesUserExistWithIdConstraint,
  ],
  exports: [
    UsersService,
    UserRepository,
    DoesUserAlreadyExistWithEmailConstraint,
    DoesUserExistWithEmailConstraint,
    DoesUserExistWithIdConstraint,
  ],
})
export class UserModule {}
