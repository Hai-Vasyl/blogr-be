import { SetPermission } from '@common/decorators/api';
import { Permissions } from '@common/enums';
import { CreatePermissionDTO } from '@modules/permissions/dto/create-permission.dto';
import { GetPermissionsDTO } from '@modules/permissions/dto/get-permission.dto';
import { Permission } from '@modules/permissions/permission.entity';
import { PermissionsService } from '@modules/permissions/permissions.service';
import {
  Controller,
  Body,
  Get,
  HttpCode,
  Post,
  Query,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { RequestAuth } from '@common/middlewares';

@Controller('permissions')
export class PermissionsController {
  public constructor(private readonly permissionsService: PermissionsService) {}

  @Post()
  @SetPermission(Permissions.CREATE_PERMISSION)
  @HttpCode(HttpStatus.CREATED)
  public async createPermission(
    @Body() createPermissionDTO: CreatePermissionDTO,
    @Req() { user }: RequestAuth,
  ): Promise<void> {
    await this.permissionsService.createPermission({
      ...createPermissionDTO,
      creatorId: user.userId,
    });
  }

  @Get()
  @SetPermission(Permissions.VIEW_PERMISSIONS)
  @HttpCode(HttpStatus.OK)
  public async getPermissions(
    @Query() getPermissionsDTO: GetPermissionsDTO,
  ): Promise<Permission[]> {
    return await this.permissionsService.getPermissions(getPermissionsDTO);
  }

  @Get('names')
  @SetPermission(Permissions.VIEW_PERMISSIONS_NAMES)
  @HttpCode(HttpStatus.OK)
  public async getPermissionNames(): Promise<string[]> {
    return this.permissionsService.getPermissionNames();
  }
}
