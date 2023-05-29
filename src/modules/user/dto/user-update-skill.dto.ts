import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserUpdateSkillDto {
  constructor(username: string) {
    this.username = username;
  }

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  skill: string[];
}
