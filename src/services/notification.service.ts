import CustomResponse, { ResponseStatus } from "../utils/customResponse";
import Notification from "../entities/Notification";
import { NotificationDto } from "../models/notification.dto";
import NotificationRepo from "../repositories/Notification";
import { UserService } from "../services";

export const get = async (id: string): Promise<Notification> => {
  const notification = await await NotificationRepo.findById(id);
  if (!notification)
    throw new CustomResponse(
      ResponseStatus.BAD_REQUEST,
      "Notification Does not exist."
    );
  return notification;
};
export const getListByUser = async (
  userId: string
): Promise<Notification[]> => {
  const user = await UserService.get(userId);
  return await NotificationRepo.findByUser(user.id);
};
export const create = async (
  notificationDto: NotificationDto
): Promise<Notification> => {
  return await NotificationRepo.save(notificationDto);
};
export const update = async (
  id: string,
  notificationDto: NotificationDto
): Promise<Notification> => {
  const notification = await get(id);
  return await NotificationRepo.save({ ...notification, ...notificationDto });
};
export const remove = async (id: string) => {
  const notification = await get(id);
  return NotificationRepo.delete(notification.id);
};
