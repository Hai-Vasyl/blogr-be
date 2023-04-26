import { Transactional } from '@common/decorators/api';
import { Permissions } from '@common/enums';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { PermissionRepository } from './permission.repository';
import { Permission } from '@modules/permissions/permission.entity';
import { UserRepository } from '@modules/users/user.repository';

type CreatePermissionDTO = {
  name: Permissions;
  description: string;
  creatorId: string;
};

type GetPermissionsDTO = {
  skip: number;
  take: number;
};

@Injectable()
export class PermissionsService {
  public constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly permissionRepository: PermissionRepository,
    private readonly userRepository: UserRepository,
  ) {}

  @Transactional()
  public async createPermission(
    createPermissionDTO: CreatePermissionDTO,
    manager?: EntityManager,
  ): Promise<void> {
    const creator = await this.userRepository.findOne({
      where: { userId: createPermissionDTO.creatorId },
    });

    await this.permissionRepository.createPermission(
      { ...createPermissionDTO, creator },
      manager,
    );
  }

  public async getPermissions({
    take,
    skip,
  }: GetPermissionsDTO): Promise<Permission[]> {
    return this.permissionRepository.find({
      take,
      skip,
      select: ['creator', 'description', 'name', 'permissionId'],
    });
  }

  public async getPermissionNames(): Promise<string[]> {
    const permissions: { name: string }[] =
      await this.permissionRepository.find({
        select: ['name'],
      });

    return Object.values(Permissions).filter((permission) =>
      permissions.includes({ name: permission }),
    );
  }
}
