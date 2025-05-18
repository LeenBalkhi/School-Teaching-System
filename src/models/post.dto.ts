import { IsEmail, IsIn, IsNotEmpty, IsNumber, Length } from "class-validator";

export default class PostDto {
  @IsNotEmpty()
  jobId: string;

  @IsNotEmpty()
  schoolId: string;
}
