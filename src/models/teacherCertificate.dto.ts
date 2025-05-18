import { IsDate, IsDateString, IsNotEmpty } from "class-validator";

export class TeacherCertificateDto {
  @IsNotEmpty()
  teacherId: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  certificateUrl: string;

  @IsDateString()
  date: string;
}
