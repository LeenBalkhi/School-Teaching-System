import { IsDate, IsEnum, IsNotEmpty, Length } from "class-validator";
import { AgeCategory, Gender } from "../utils/types";

export default class SchoolDto {
  @IsNotEmpty()
  userId: string;

  @IsEnum(Gender)
  studentsGender: Gender;

  @IsEnum(AgeCategory)
  ageCategory: AgeCategory;
}
