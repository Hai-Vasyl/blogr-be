import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { ErrorProcessable } from '@common/decorators/api';
import { UserRepository } from '@modules/users/user.repository';
import { LoginMethods } from '@modules/users/enums/login-method.enum';

export type JwtTokenResponse = {
  token: string;
  sub: string;
};

export type JwtTokenPayload = {
  sub: string;
};

@Injectable()
export class AuthService {
  private jwtSecret: string;

  public constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userRepository: UserRepository,
  ) {
    ({ jwtSecret: this.jwtSecret } = configService.get('common'));
  }

  public generatePasswordHash(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  public comparePasswordHash(password: string, hashPassword: string): boolean {
    return bcrypt.compareSync(password, hashPassword);
  }

  public verifyJwtToken(token: string): Promise<JwtTokenPayload> {
    return this.jwtService.verifyAsync(token, { secret: this.jwtSecret });
  }

  public signJwtToken(sub: string): JwtTokenResponse {
    return {
      token: this.jwtService.sign(
        { sub },
        { secret: this.jwtSecret, expiresIn: '1d' },
      ),
      sub,
    };
  }

  @ErrorProcessable()
  public async login(email: string): Promise<JwtTokenResponse> {
    const user = await this.userRepository.findOne({
      where: { email, loginMethod: LoginMethods.LOCAL },
    });

    return this.signJwtToken(user.userId);
  }
}
