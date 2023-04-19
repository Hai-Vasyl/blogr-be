import { Transactional } from '@common/decorators/api';
import { Permissions } from '@common/enums';
import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { PermissionRepository } from './permission.repository';
import { Permission } from '@modules/permissions/permission.entity';

type CreatePermissionDTO = {
  name: Permissions;
  description: string;
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
  ) {}

  @Transactional()
  public async createPermissions(
    createPermissionsDTO: CreatePermissionDTO[],
    manager?: EntityManager,
  ): Promise<void> {
    await this.permissionRepository.createPermissions(
      createPermissionsDTO,
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
}
