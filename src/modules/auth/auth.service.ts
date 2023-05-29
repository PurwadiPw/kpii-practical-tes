import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

import { ResponseService } from '@/utils/response/response.service';
import { UserService } from '@/modules/user/user.service';
import { LoginDto } from '@/modules/auth/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private responseService: ResponseService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async generatePassword(password: string): Promise<string> {
    const defaultSalt: number = 10;
    const salt = bcrypt.genSaltSync(defaultSalt);

    return bcrypt.hash(password, salt);
  }

  async validatePassword(passwordString: string, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(passwordString, passwordHash);
  }

  async validateUser(username: string, pass: string) {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('User connot be found!');
    }

    const validate: boolean = await this.validatePassword(pass, user.password);

    if (!validate) {
      throw new UnauthorizedException('invalid login');
    }

    user.password = undefined;

    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);

    const payload = {
      username: user.username,
      profile: user.profile,
      sub: user._id,
    };

    const token = this.jwtService.sign(payload);
    const username = user.username;
    const profile = user.profile;

    return this.responseService.success({
      statusCode: HttpStatus.OK,
      data: { username, profile, token }
    });
  }

  async logout(token: string) {
    return this.responseService.success({
      statusCode: HttpStatus.OK,
      message: 'logout success',
    });
  }
}
