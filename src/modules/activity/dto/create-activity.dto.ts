import { IsArray, IsDate, IsNotEmpty, IsString } from "class-validator";
import { Transform } from "class-transformer";

export class CreateActivityDto {
  @IsNotEmpty()
  readonly skill: string;

  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  @Transform( ({ value }) => new Date(value))
  @IsDate()
  readonly startdate: Date;

  @IsNotEmpty()
  @Transform( ({ value }) => new Date(value))
  @IsDate()
  readonly enddate: Date;

  @IsArray()
  readonly participants: string[];
}
