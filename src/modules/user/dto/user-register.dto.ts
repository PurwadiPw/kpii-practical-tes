import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserRegisterDto {
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  readonly profile: string;

  @IsNotEmpty()
  readonly skill: string[];
}
