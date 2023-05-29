import { Body, Controller, HttpCode, Post, Query } from '@nestjs/common';

import { AuthService } from '@/modules/auth/auth.service';
import { LoginDto } from '@/modules/auth/dto/login.dto';
import { Public } from '@/modules/auth/decorators/public.decorator';

@Controller('v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('/logout')
  @HttpCode(200)
  async logout(@Query('token') token) {
    return this.authService.logout(token);
  }
}
