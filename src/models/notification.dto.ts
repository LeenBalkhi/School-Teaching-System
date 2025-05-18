import { IsEnum, IsNotEmpty } from "class-validator";
import { NotificationStatus, NotificationType } from "utils/types";

export class NotificationDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  body: string;

  @IsEnum(NotificationType)
  notificationType: NotificationType;

  @IsEnum(NotificationStatus)
  status: NotificationStatus;

  data?: string;

  itemId?: string;

  @IsNotEmpty()
  userId: string;
}
