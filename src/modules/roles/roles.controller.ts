import { CreateRoleDTO } from '@modules/roles/dto/create-role.dto';
import { RolesService } from '@modules/roles/roles.service';
import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';

@Controller('roles')
export class RolesController {
  public constructor(private readonly rolesService: RolesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createRole(@Body() createRoleDTO: CreateRoleDTO): Promise<void> {
    await this.rolesService.createRole(createRoleDTO);
  }
}
