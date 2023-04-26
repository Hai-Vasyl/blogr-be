import { SetPermission } from '@common/decorators/api';
import { Permissions } from '@common/enums';
import { JwtTokenResponse } from '@modules/auth/auth.service';
import { CreateUserDTO } from '@modules/users/dto/create-user.dto';
import { GetUserParamDTO } from '@modules/users/dto/get-user-param.dto';
import { LoginUserDTO } from '@modules/users/dto/login-user.dto';
import { User } from '@modules/users/user.entity';
import { UsersService } from '@modules/users/users.service';
import { IsUserPasswordValidPipe } from '@modules/users/validation/is-user-password-valid.pipe';
import {
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Get,
  UsePipes,
  Param,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  public constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @UsePipes(IsUserPasswordValidPipe)
  @HttpCode(HttpStatus.ACCEPTED)
  public async login(
    @Body() { email }: LoginUserDTO,
  ): Promise<JwtTokenResponse> {
    return await this.usersService.login(email);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  public async createUser(@Body() createUserDto: CreateUserDTO): Promise<void> {
    await this.usersService.createUser(createUserDto);
  }

  // @Get('protected')
  // @SetPermission(Permissions.CREATE_PERMISSION)
  // @HttpCode(HttpStatus.OK)
  // public protected(): {
  //   protectedData: string;
  // } {
  //   return { protectedData: 'some very protected data!!!!' };
  // }

  @Get(':userId')
  @SetPermission(Permissions.VIEW_USER)
  @HttpCode(HttpStatus.OK)
  public async getUser(@Param() { userId }: GetUserParamDTO): Promise<User> {
    return this.usersService.getUser(userId);
  }
}
