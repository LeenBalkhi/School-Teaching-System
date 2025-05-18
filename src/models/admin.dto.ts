import { IsNotEmpty } from "class-validator";

export class AdminDto {
  @IsNotEmpty()
  userId: string;
}
