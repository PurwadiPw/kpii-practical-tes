import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { Types } from 'mongoose';

import { ParseObjectIdPipe } from '@/utils/pipes/parse-object-id.pipe';

import { ActivityService } from '@/modules/activity/activity.service';

import { CreateActivityDto } from '@/modules/activity/dto/create-activity.dto';
import { UpdateActivityDto } from '@/modules/activity/dto/update-activity.dto';

import { Roles } from '@/modules/auth/decorators/roles.decorator';
import { Role } from '@/modules/auth/enums/role.enum';

@Controller('v1/activity')
export class ActivityController {
  constructor(private readonly activitysService: ActivityService) {}

  @Get(':skill_id')
  async findAll(@Param('skill_id', new ParseObjectIdPipe()) skillId: Types.ObjectId) {
    return await this.activitysService.findBySkillId(skillId);
  }

  @Get(':id/detail')
  async findOne(@Param('id', new ParseObjectIdPipe()) id: Types.ObjectId) {
    return await this.activitysService.findOne(id);
  }

  @Post()
  @Roles(Role.Expert)
  @HttpCode(200)
  async create(@Body() createActivityDto: CreateActivityDto) {
    return await this.activitysService.create(createActivityDto);
  }

  @Patch(':id')
  @Roles(Role.Expert)
  async update(@Param('id', new ParseObjectIdPipe()) id: Types.ObjectId, @Body() updateActivityDto: UpdateActivityDto) {
    return await this.activitysService.update(id, updateActivityDto);
  }

  @Delete(':id')
  @Roles(Role.Expert)
  async remove(@Param('id', new ParseObjectIdPipe()) id: Types.ObjectId) {
    return await this.activitysService.delete(id);
  }
}
