import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ResponseService } from '@/utils/response/response.service';
import { Skill, SkillDocument } from '@/modules/skill/schema/skill.schema';
import { CreateSkillDto } from '@/modules/skill/dto/create-skill.dto';

@Injectable()
export class SkillService {
  constructor(
    @InjectModel(Skill.name) private skillModel: Model<SkillDocument>,
    private responseService: ResponseService,
  ) {}

  async findAll() {
    const skill = await this.skillModel.find();

    return this.responseService.success({
      statusCode: HttpStatus.OK,
      data: skill
    });
  }

  async findOne(id: object): Promise<Skill|null> {
    return this.skillModel.findOne({ _id: id});
  }

  async create(createSkillDto: CreateSkillDto) {
    const skill = await this.findBySkillName(createSkillDto.skillName)
    if (skill) {
      return
    }

    const newSkill = new this.skillModel(createSkillDto);
    return newSkill.save();
  }

  async findBySkillName(skillName: string) {
    return this.skillModel.findOne({ skillName: skillName});
  }
}
