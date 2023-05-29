import { HttpStatus, Inject, Injectable, UnprocessableEntityException, forwardRef } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User, UserDocument } from '@/modules/user/schemas/user.schema';
import { UserRegisterDto } from '@/modules/user/dto/user-register.dto';
import { UserUpdateSkillDto } from '@/modules/user/dto/user-update-skill.dto';

import { ResponseService } from '@/utils/response/response.service';
import { AuthService } from '@/modules/auth/auth.service';
import { SkillService } from '@/modules/skill/skill.service';
import { CreateSkillDto } from '@/modules/skill/dto/create-skill.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @Inject(forwardRef(() => AuthService)) private authService: AuthService,
    private responseService: ResponseService,
    private skillService: SkillService,
  ) {}

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username });
  }

  async create(userRegisterDto: UserRegisterDto) {
    const user = await this.findByUsername(userRegisterDto.username);

    if (user) {
      throw new UnprocessableEntityException('Data cannot be processed');
    }

    try {
      for (const skillName of userRegisterDto.skill) {
        const skill = await this.skillService.findBySkillName(skillName);
        if (!skill) {
          const createSkillDto = new CreateSkillDto();
          createSkillDto.skillName = skillName;

          await this.skillService.create(createSkillDto);
        }
      }

      userRegisterDto.password = await this.authService.generatePassword(userRegisterDto.password)

      let newUser = new this.userModel(userRegisterDto)
      let newUserSaved = await newUser.save()

      newUserSaved.password = undefined;

      return this.responseService.success({
        statusCode: HttpStatus.OK,
        message: 'create success',
        data: newUserSaved
      });
    } catch (e) {
      throw new UnprocessableEntityException('Data cannot be processed');
    }
  }

  async update(userUpdateSkillDto: UserUpdateSkillDto) {
    return this.userModel.findOneAndUpdate({ username: userUpdateSkillDto.username }, userUpdateSkillDto, { new: false }).populate('skill');
  }
}
