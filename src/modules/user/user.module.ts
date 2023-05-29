import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ResponseService } from '@/utils/response/response.service';
import { UserService } from '@/modules/user/user.service';
import { UserController } from '@/modules/user/user.controller';
import { User, UserSchema } from '@/modules/user/schemas/user.schema';

import { AuthModule } from '@/modules/auth/auth.module';
import { SkillModule } from '@/modules/skill/skill.module';

@Module({
  imports: [
    MongooseModule.forFeature([ { name: User.name, schema: UserSchema } ]),
    forwardRef(() => AuthModule),
    SkillModule,
  ],
  controllers: [UserController],
  providers: [UserService, ResponseService],
  exports: [UserService],
})
export class UserModule {}
