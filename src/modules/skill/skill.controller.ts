import { Controller, Get } from '@nestjs/common';

import { SkillService } from '@/modules/skill/skill.service';

@Controller('v1/skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  async findAll() {
    return this.skillService.findAll();
  }
}
