import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SkillController } from '@/modules/skill/skill.controller';
import { SkillService } from '@/modules/skill/skill.service';
import { Skill, SkillSchema } from '@/modules/skill/schema/skill.schema';
import { ResponseService } from '@/utils/response/response.service';

@Module({
  imports: [
    MongooseModule.forFeature([ { name: Skill.name, schema: SkillSchema } ])
  ],
  controllers: [SkillController],
  providers: [SkillService, ResponseService],
  exports: [SkillService],
})
export class SkillModule {}
