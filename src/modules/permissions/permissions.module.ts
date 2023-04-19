import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DoesPermissionAlreadyExistWithNameConstraint } from '@modules/permissions/validation/does-permission-already-exist-with-name';
import { DoesPermissionExistWithIdConstraint } from '@modules/permissions/validation/does-permission-exist-with-id';
import { Permission } from '@modules/permissions/permission.entity';
import { PermissionsController } from '@modules/permissions/permissions.controller';
import { PermissionsService } from '@modules/permissions/permissions.service';
import { PermissionRepository } from '@modules/permissions/permission.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionsController],
  providers: [
    PermissionsService,
    PermissionRepository,
    DoesPermissionAlreadyExistWithNameConstraint,
    DoesPermissionExistWithIdConstraint,
  ],
  exports: [
    PermissionsService,
    PermissionRepository,
    DoesPermissionAlreadyExistWithNameConstraint,
    DoesPermissionExistWithIdConstraint,
  ],
})
export class PermissionsModule {}
