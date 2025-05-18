import { IsDate, IsEnum, IsNotEmpty, Length } from "class-validator";
import { AgeCategory, Gender } from "../utils/types";

export default class UpdateSchoolDto {
  @IsEnum(Gender)
  studentsGender: Gender;

  @IsEnum(AgeCategory)
  ageCategory: AgeCategory;

  @IsNotEmpty()
  name: string;

  @Length(8, 20)
  phone: string;

  @IsNotEmpty()
  address: string;

  imageUrl: string;
}
