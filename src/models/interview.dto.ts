import { IsDate, IsDateString, IsEnum, IsNotEmpty } from "class-validator";
import { InterviewStatus } from "../utils/types";

export default class InterviewDto {
  @IsNotEmpty()
  @IsDateString()
  date_time: string;

  @IsEnum(InterviewStatus)
  status: InterviewStatus;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  teacherId: string;

  @IsNotEmpty()
  schoolId: string;

  @IsNotEmpty()
  jobId: string;
}
