import { IsDate, IsEnum, IsNotEmpty, Length } from "class-validator";
import { ProfileType } from "../utils/types";

export default class JobRequestDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;

  @IsNotEmpty()
  status: string;

  @IsEnum(ProfileType)
  sourceProfile: ProfileType;

  @IsNotEmpty()
  teacherId: string;

  @IsNotEmpty()
  schoolId: string;

  @IsNotEmpty()
  jobId: string;
}
