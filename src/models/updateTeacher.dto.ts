import { IsDate, IsEnum, IsISO8601, IsNotEmpty, Length } from "class-validator";
import {
  BaccalaureateType,
  Gender,
  TeachingPhase,
  TeachingStatus,
} from "../utils/types";

export default class UpdateTeacherDto {
  @IsNotEmpty()
  specialization: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsEnum(TeachingStatus)
  teachingStatus: TeachingStatus;

  @IsEnum(BaccalaureateType)
  baccalaureate: BaccalaureateType;

  @IsEnum(TeachingPhase)
  teachingPhase: TeachingPhase;

  cvUrl: string;

  brief: string;

  @IsNotEmpty()
  name: string;

  @Length(8, 20)
  phone: string;

  @IsNotEmpty()
  address: string;

  imageUrl: string;
}
