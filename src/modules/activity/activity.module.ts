import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ActivityController } from '@/modules/activity/activity.controller';
import { ActivityService } from '@/modules/activity/activity.service';
import { Activity, ActivitySchema } from '@/modules/activity/schemas/activity.schema';

import { UserModule } from '@/modules/user/user.module';
import { SkillModule } from '@/modules/skill/skill.module';
import { ResponseService } from '@/utils/response/response.service';

@Module({
  imports: [
    MongooseModule.forFeature([ { name: Activity.name, schema: ActivitySchema } ]),
    UserModule,
    SkillModule,
  ],
  controllers: [ActivityController],
  providers: [ActivityService, ResponseService]
})
export class ActivityModule {}
