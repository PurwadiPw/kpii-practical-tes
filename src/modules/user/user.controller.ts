import { Body, Controller, Post } from '@nestjs/common';

import { UserService } from '@/modules/user/user.service';
import { UserRegisterDto } from '@/modules/user/dto/user-register.dto';

import { Roles } from '@/modules/auth/decorators/roles.decorator';
import { Role } from '@/modules/auth/enums/role.enum';

@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(Role.Board)
  async registerUser(@Body() userRegisterDto: UserRegisterDto) {
    return this.userService.create(userRegisterDto);
  }
}
