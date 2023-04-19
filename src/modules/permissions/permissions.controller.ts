import { CreatePermissionsDTO } from '@modules/permissions/dto/create-permissions.dto';
import { GetPermissionsDTO } from '@modules/permissions/dto/get-permission.dto';
import { Permission } from '@modules/permissions/permission.entity';
import { PermissionsService } from '@modules/permissions/permissions.service';
import { Controller } from '@nestjs/common';
import { Body, Get, HttpCode, Post, Query } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';

@Controller('permissions')
export class PermissionsController {
  public constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createPermissions(
    @Body() createPermissionsDTO: CreatePermissionsDTO,
  ): Promise<void> {
    await this.permissionsService.createPermissions(
      createPermissionsDTO.permissions,
    );
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  public async getPermissions(
    @Query() getPermissionsDTO: GetPermissionsDTO,
  ): Promise<Permission[]> {
    return await this.permissionsService.getPermissions(getPermissionsDTO);
  }
}
