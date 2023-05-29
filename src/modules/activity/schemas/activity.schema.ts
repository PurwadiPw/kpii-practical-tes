import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ActivityDocument = Activity & Document;

@Schema()
export class Activity {
  _id: string;

  @Prop({
    required: true,
  })
  skill: string;

  @Prop({
    required: true,
  })
  title: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: true,
    type: Date,
  })
  startdate: Date;

  @Prop({
    required: true,
    type: Date,
  })
  enddate: Date;

  @Prop({
    required: true,
  })
  participants: string[];
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);