import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from '@/modules/auth/auth.controller';
import { AuthService } from '@/modules/auth/auth.service';
import { UserModule } from '@/modules/user/user.module';
import { ResponseService } from '@/utils/response/response.service';

import { jwtConstants } from '@/utils/constans/jwt.constant';
import { JwtStrategy } from '@/modules/auth/strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    forwardRef(() => UserModule),
  ],
  controllers: [AuthController],
  providers: [AuthService, ResponseService, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
