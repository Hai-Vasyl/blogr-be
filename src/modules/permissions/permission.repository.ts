import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { ErrorProcessable } from '@common/decorators/api/error-processable.decorator';
import { Permission } from '@modules/permissions/permission.entity';
import { BaseRepository } from '@common/repositories';
import { Permissions } from '@common/enums';
import { ProvideManager } from '@common/decorators/api';

type CreatePermissionDTO = {
  name: Permissions;
  description: string;
};

@Injectable()
export class PermissionRepository extends BaseRepository<Permission> {
  public constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {
    super(permissionRepository);
  }

  @ProvideManager()
  @ErrorProcessable()
  public async createPermissions(
    createPermissionsDTO: CreatePermissionDTO[],
    manager?: EntityManager,
  ): Promise<Permission[]> {
    return await manager.save(this.target, createPermissionsDTO);
  }
}
