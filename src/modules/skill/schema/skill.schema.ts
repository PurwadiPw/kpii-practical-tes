import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type SkillDocument = Skill & Document;

@Schema()
export class Skill {

  @Prop({
    required: true,
  })
  skillName: string;
}

export const SkillSchema = SchemaFactory.createForClass(Skill);