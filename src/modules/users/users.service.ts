import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

import { Transactional } from '@common/decorators/api';
import { generateColor } from '@common/helpers';
import { Role } from '@modules/roles/role.entity';
import { RoleRepository } from '@modules/roles/role.repository';
import { RolesService } from '@modules/roles/roles.service';
import { Genders } from '@modules/users/enums/gender.enum';
import { LoginMethods } from '@modules/users/enums/login-method.enum';
import { UserRepository } from '@modules/users/user.repository';
import { Injectable } from '@nestjs/common/decorators';
import { AuthService, JwtTokenResponse } from '@modules/auth/auth.service';
import { User } from '@modules/users/user.entity';

type CreateUserDTO = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: Genders;
  roleId?: string;
};

@Injectable()
export class UsersService {
  public constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
    private readonly userRepository: UserRepository,
    private readonly roleRepository: RoleRepository,
    private readonly roleService: RolesService,
    private readonly authService: AuthService,
  ) {}

  private async getUserRole(
    roleId: string,
    manager?: EntityManager,
  ): Promise<Role> {
    if (roleId) {
      return await this.roleRepository.findOne({
        where: { roleId },
      });
    }

    let role = await this.roleRepository.findOne({
      where: { isDefault: true },
    });

    if (!role) {
      role = await this.roleRepository.findOne({
        where: { isSuperAdmin: true },
      });

      if (!role) {
        await this.roleService.createRoleSuperAdmin(manager);

        role = await this.roleRepository.findOne({
          where: { isSuperAdmin: true },
        });
      }
    }

    return role;
  }

  @Transactional()
  public async createUser(
    { roleId, ...createUserData }: CreateUserDTO,
    manager?: EntityManager,
  ): Promise<void> {
    const role = await this.getUserRole(roleId, manager);
    const password = this.authService.generatePasswordHash(
      createUserData.password,
    );

    await this.userRepository.createUser(
      {
        ...createUserData,
        role,
        password,
        color: generateColor(),
        loginMethod: LoginMethods.LOCAL,
      },
      manager,
    );
  }

  public async login(email: string): Promise<JwtTokenResponse> {
    return this.authService.login(email);
  }

  public async getUser(userId: string): Promise<User> {
    return this.userRepository.findOne({
      where: { userId },
      select: [
        'avatar',
        'bio',
        'birth',
        'color',
        'email',
        'firstName',
        'lastName',
        'gender',
        'role',
        'userId',
      ],
    });
  }
}
