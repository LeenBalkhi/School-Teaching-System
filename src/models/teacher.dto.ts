import { IsDate, IsEnum, IsISO8601, IsNotEmpty, Length } from "class-validator";
import {
  BaccalaureateType,
  Gender,
  TeachingPhase,
  TeachingStatus,
} from "../utils/types";

export default class TeacherDto {
  @IsNotEmpty()
  userId: string;

  @IsISO8601()
  birthday: string;

  @IsNotEmpty()
  nationality: string;

  @IsNotEmpty()
  university: string;

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
}
