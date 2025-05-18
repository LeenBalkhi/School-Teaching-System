import { Request, Response } from "express";
import { SchoolService } from "../services";
import SchoolDto from "../models/school.dto";
import {
  badRequestHandler,
  getItemOrListResponse,
  responseHandler,
} from "../utils/helperes";
import User from "entities/User";
import UserDto from "models/user.dto";
import UpdateSchoolDto from "models/updateSchool.dto";

export const get = async (req: Request, res: Response) => {
  const { schoolId } = req.query;
  const result = await getItemOrListResponse(schoolId as string, SchoolService);
  res.send(result);
};

export const create = async (req: Request, res: Response) => {
  try {
    const result = await SchoolService.create(req.body as SchoolDto);
    responseHandler("School Account Created Successfully.", res, result);
  } catch (error) {
    badRequestHandler("Error Creating School Account.", res, error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { schoolId } = req.query;
    const result = await SchoolService.update(
      schoolId as string,
      req.body as UpdateSchoolDto
    );
    responseHandler("School Updated Successfully.", res, result);
  } catch (error) {
    badRequestHandler("Error Updating School.", res, error);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { schoolId } = req.query;
    await SchoolService.remove(schoolId as string);
    responseHandler("School Deleted Successfully.", res);
  } catch (error) {
    badRequestHandler("Error Deleting School.", res, error);
  }
};
