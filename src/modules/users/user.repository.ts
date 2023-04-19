import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ErrorProcessable, ProvideManager } from '@common/decorators/api';
import { BaseRepository } from '@common/repositories';
import { Role } from '@modules/roles/role.entity';
import { Genders } from '@modules/users/enums/gender.enum';
import { User } from '@modules/users/user.entity';
import { LoginMethods } from '@modules/users/enums/login-method.enum';

type CreateUserDTO = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  gender: Genders;
  color: string;
  role: Role;
  loginMethod: LoginMethods;
};

@Injectable()
export class UserRepository extends BaseRepository<User> {
  public constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  @ProvideManager()
  @ErrorProcessable()
  public async createUser(
    createUserDTO: CreateUserDTO,
    manager?: EntityManager,
  ): Promise<User> {
    return await manager.save(this.target, createUserDTO);
  }
}
