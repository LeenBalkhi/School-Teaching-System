import { IsNotEmpty } from "class-validator";

export class TeacherExperienceDto {
  @IsNotEmpty()
  teacherId: string;

  experienceId?: string;
}
