import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumberString,
  Length,
} from "class-validator";
import { ExperienceType } from "../utils/types";

export default class ExperienceDto {
  @IsNotEmpty()
  experienceName: string;

  @IsNotEmpty()
  experienceSource: string;

  @IsNumberString()
  experienceNumOfYears: number;

  @IsEnum(ExperienceType)
  experienceType: ExperienceType;

  experienceDescription?: string;

  experienceCertificateUrl?: string;
}
