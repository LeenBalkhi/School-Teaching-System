import { SchoolTeacherStatus } from "../utils/types";
import { IsEnum, IsNotEmpty } from "class-validator";

export class SchoolTeacherDto {
  @IsNotEmpty()
  teacherId: string;

  @IsNotEmpty()
  schoolId: string;

  @IsEnum(SchoolTeacherStatus)
  status: SchoolTeacherStatus;
}
