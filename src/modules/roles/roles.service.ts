import { Transactional } from '@common/decorators/api';
import { generateColor } from '@common/helpers';
import { PermissionRepository } from '@modules/permissions/permission.repository';
import { RoleRepository } from '@modules/roles/role.repository';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

type CreateRoleDTO = {
  name: string;
  description: string;
  isDefault: boolean;
  permissions: string[];
};

@Injectable()
export class RolesService {
  public constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly roleRepository: RoleRepository,
    private readonly permissionRepository: PermissionRepository,
  ) {}

  @Transactional()
  public async createRole(
    createRoleDTO: CreateRoleDTO,
    manager?: EntityManager,
  ): Promise<void> {
    const permissions = await Promise.all(
      createRoleDTO.permissions.map((permissionId) =>
        this.permissionRepository.findOne({ where: { permissionId } }),
      ),
    );

    await this.roleRepository.createRole(
      {
        ...createRoleDTO,
        permissions,
        color: generateColor(),
      },
      manager,
    );
  }

  @Transactional()
  public async createRoleSuperAdmin(manager?: EntityManager): Promise<void> {
    await this.roleRepository.createRole(
      {
        name: 'super-admin',
        description:
          'User who has complete access to all functionality of the system',
        color: generateColor(),
        isSuperAdmin: true,
      },
      manager,
    );
  }
}
