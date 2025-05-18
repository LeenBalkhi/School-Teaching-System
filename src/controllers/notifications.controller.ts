import { Request, Response } from "express";
import { NotificationDto } from "../models/notification.dto";
import { NotificationService } from "../services";
import { badRequestHandler, responseHandler } from "../utils/helperes";

export const get = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    const result =await NotificationService.getListByUser(userId as string);
    return responseHandler(null, res, result);
  } catch (error) {
    badRequestHandler("Error Getting User Notifications.", res, error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.query;
    const result = await NotificationService.update(
      notificationId as string,
      req.body as NotificationDto
    );
    responseHandler("Notification Updated Successfully.", res, result);
  } catch (error) {
    badRequestHandler("Error Updating Notification.", res, error);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.query;
    await NotificationService.remove(notificationId as string);
    responseHandler("Notification Deleted Successfully.", res);
  } catch (error) {
    badRequestHandler("Error Deleting Notification.", res, error);
  }
};
