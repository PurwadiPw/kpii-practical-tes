import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { Transform } from "class-transformer";
import { Prop } from "@nestjs/mongoose";
import mongoose from "mongoose";

import { User } from "@/modules/user/schemas/user.schema";

export class ListActivityDto {
  @IsNotEmpty()
  skillID: string;

  @IsNotEmpty()
  skillName: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @Transform( ({ value }) => new Date(value))
  @IsDate()
  startdate: Date;

  @IsNotEmpty()
  @Transform( ({ value }) => new Date(value))
  @IsDate()
  enddate: Date;

  @IsNotEmpty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  participants: User[];
}
