import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PermissionsModule } from '@modules/permissions/permissions.module';
import { Role } from '@modules/roles/role.entity';
import { RoleRepository } from '@modules/roles/role.repository';
import { RolesController } from '@modules/roles/roles.controller';
import { RolesService } from '@modules/roles/roles.service';
import { DoesRoleAlreadyExistWithNameConstraint } from '@modules/roles/validation/does-role-already-exist-with-name';
import { DoesRoleExistWithIdConstraint } from '@modules/roles/validation/does-role-exist-with-id';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    forwardRef(() => PermissionsModule),
  ],
  controllers: [RolesController],
  providers: [
    RolesService,
    RoleRepository,
    DoesRoleAlreadyExistWithNameConstraint,
    DoesRoleExistWithIdConstraint,
  ],
  exports: [
    RolesService,
    RoleRepository,
    DoesRoleAlreadyExistWithNameConstraint,
    DoesRoleExistWithIdConstraint,
  ],
})
export class RolesModule {}
