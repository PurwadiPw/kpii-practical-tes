import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

export enum UserProfileType {
  BOARD = 'board',
  EXPERT = 'expert',
  TRAINER = 'trainer',
  COMPETITOR = 'competitor',
}

@Schema()
export class User {
  _id: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  username: string;

  @Prop({
    required: true,
  })
  password: string;

  @Prop({
    required: true,
  })
  profile: UserProfileType;

  @Prop({
    required: true,
  })
  skill: string[];

  @Prop()
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
