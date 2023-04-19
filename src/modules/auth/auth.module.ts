import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

import { AuthService } from '@modules/auth/auth.service';
import { UserModule } from '@modules/users/users.module';

@Module({
  imports: [JwtModule, ConfigModule, forwardRef(() => UserModule)],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
