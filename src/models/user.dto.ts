import { IsEmail, IsNotEmpty, Length } from "class-validator";

export default class UserDto {
  @IsNotEmpty()
  name: string;

  @Length(8, 20)
  phone: string;

  @IsNotEmpty()
  address: string;

  imageUrl: string;

  @IsEmail()
  email: string;

  @Length(8, 20)
  password: string;
}
