import { HttpStatus, Injectable, Logger, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Activity, ActivityDocument } from '@/modules/activity/schemas/activity.schema';
import { ResponseService } from '@/utils/response/response.service';
import { SkillService } from '@/modules/skill/skill.service';
import { UserService } from '@/modules/user/user.service';

import { CreateActivityDto } from '@/modules/activity/dto/create-activity.dto';
import { UpdateActivityDto } from '@/modules/activity/dto/update-activity.dto';

import { UserUpdateSkillDto } from '@/modules/user/dto/user-update-skill.dto';
import { CreateSkillDto } from '@/modules/skill/dto/create-skill.dto';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name) private activityModel: Model<ActivityDocument>,
    private responseService: ResponseService,
    private skillService: SkillService,
    private userService: UserService,
  ) {}

  async findAll() {
    return this.activityModel.find();
  }

  async findOne(id: object): Promise<Activity|null> {
    return this.activityModel.findOne({ _id: id});
  }

  async findBySkillId(skillId: object) {
    const skill = await this.skillService.findOne(skillId);

    if (!skill) {
      throw new NotFoundException(
        this.responseService.error({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'skill not found'
        })
      );
    }

    const activity = await this.activityModel.find({ skill: skill.skillName } );

    if (!activity.length) {
      throw new NotFoundException(
        this.responseService.error({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'no activities data found'
        })
      );
    }

    return this.responseService.success({
      statusCode: HttpStatus.OK,
      data: activity
    });
  }

  async create(createActivityDto: CreateActivityDto) {
    try {
      for (const participantName of createActivityDto.participants) {
        const participant = await this.userService.findByUsername(participantName);

        if (!participant) {
          throw new UnprocessableEntityException();
        }

        if (!participant.skill.includes(createActivityDto.skill)) {
          participant.skill.push(createActivityDto.skill);

          const userUpdateDto = new UserUpdateSkillDto(participant.username);
          userUpdateDto.skill = participant.skill;

          await this.userService.update(userUpdateDto);
        }
      }

      const newActivity = new this.activityModel(createActivityDto)
      const newActivitySaved = await newActivity.save()

      const createSkillDto = new CreateSkillDto();
      createSkillDto.skillName = newActivitySaved.skill;

      await this.skillService.create(createSkillDto);

      return this.responseService.success({
        statusCode: HttpStatus.OK,
        message: 'create success',
        data: newActivitySaved,
      })
    } catch (e) {
      throw new UnprocessableEntityException(
        this.responseService.error({
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message: 'Data cannot be processed'
        })
      );
    }
  }

  async update(id: object, updateActivityDto: UpdateActivityDto) {
    const activity = await this.activityModel.findByIdAndUpdate(
      { _id: id }, updateActivityDto, { new: false }
    )
    .populate('skill')
    .populate('title')
    .populate('description')
    .populate('startdate')
    .populate('enddate')
    .populate('participants');

    if (!activity) {
      throw new UnprocessableEntityException(
        this.responseService.error({
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message: 'Data cannot be processed'
        })
      );
    }

    return this.responseService.success({
      statusCode: HttpStatus.OK,
      message: 'update success',
      data: activity
    });
  }

  async delete(id: object) {
    try {
      const deleted = await this.activityModel.deleteOne({ _id: id });
      if (deleted.acknowledged && deleted.deletedCount == 1) {
        return this.responseService.success({
          statusCode: HttpStatus.OK,
          message: 'delete success',
        });
      }
      throw new UnprocessableEntityException();
    } catch (e) {
      throw new UnprocessableEntityException(
        this.responseService.error({
          statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          message: 'Data cannot be processed'
        })
      );
    }
  }
}
