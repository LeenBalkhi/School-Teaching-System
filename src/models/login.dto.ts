import { IsEmail, Length } from "class-validator";

export default class LoginDto {
  @IsEmail()
  email: string;

  @Length(8, 20)
  password: string;
}
