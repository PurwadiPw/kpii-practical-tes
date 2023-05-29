import { IsNotEmpty } from "class-validator";

export class CreateSkillDto {
  @IsNotEmpty()
  skillName: string;
}
