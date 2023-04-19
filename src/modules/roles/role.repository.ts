import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { BaseRepository } from '@common/repositories';
import { Role } from '@modules/roles/role.entity';
import { ErrorProcessable, ProvideManager } from '@common/decorators/api';
import { Permission } from '@modules/permissions/permission.entity';

type CreateRoleDTO = {
  name: string;
  description: string;
  color: string;
  isDefault?: boolean;
  permissions?: Permission[];
  isSuperAdmin?: boolean;
};

@Injectable()
export class RoleRepository extends BaseRepository<Role> {
  public constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {
    super(roleRepository);
  }

  @ProvideManager()
  @ErrorProcessable()
  public async createRole(
    createRoleDTO: CreateRoleDTO,
    manager?: EntityManager,
  ): Promise<Role> {
    if (createRoleDTO.isDefault) {
      await manager.update(this.target, {}, { isDefault: false });
    }

    return await manager.save(this.target, createRoleDTO);
  }
}
