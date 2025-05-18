import {
  IsBooleanString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
} from "class-validator";
import { BaccalaureateType, Gender, TeachingPhase } from "../utils/types";

export default class JobDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;

  @IsNumberString()
  hoursPerWeek: number;

  @IsNotEmpty()
  status: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsBooleanString()
  hasExperience: string;

  baccalaureate?: BaccalaureateType;

  teachingPhase?: TeachingPhase;
}
