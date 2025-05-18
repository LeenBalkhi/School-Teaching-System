import { Request, Response } from "express";
import {
  badRequestHandler,
  getItemOrListResponse,
  responseHandler,
} from "../utils/helperes";
import { TeacherExperienceService } from "../services";
import CustomResponse, { ResponseStatus } from "../utils/customResponse";
import TeacherExperience from "../entities/TeacherExperience";
import ExperienceDto from "../models/experience.dto";
import { TeacherExperienceDto } from "../models/teacherExperience.dto";

export const get = async (req: Request, res: Response) => {
  try {
    const { teacherExperienceId, teacherId } = req.query;
    let result: TeacherExperience | TeacherExperience[];
    if (teacherExperienceId)
      result = await TeacherExperienceService.get(
        teacherExperienceId as string
      );
    else if (teacherId)
      result = await TeacherExperienceService.getList(teacherId as string);
    else
      throw new CustomResponse(
        ResponseStatus.BAD_REQUEST,
        "teacherExperienceId Or teacherId must be passed."
      );
    responseHandler(null, res, result);
  } catch (error) {
    badRequestHandler("Error Getting Teacher Experience Info.", res, error);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const result = await TeacherExperienceService.create(
      req.body as TeacherExperienceDto,
      req.body as ExperienceDto
    );
    responseHandler("Teacher Experience Created Successfully.", res, result);
  } catch (error) {
    badRequestHandler("Error Creating Teacher Experience.", res, error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { teacherExperienceId } = req.query;
    const result = await TeacherExperienceService.update(
      teacherExperienceId as string,
      req.body as ExperienceDto
    );
    responseHandler("Teacher Experience Updated Successfully.", res, result);
  } catch (error) {
    badRequestHandler("Error Updating Teacher Experience.", res, error);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { teacherExperienceId } = req.query;
    await TeacherExperienceService.remove(teacherExperienceId as string);
    responseHandler("Teacher Experience Deleted Successfully.", res);
  } catch (error) {
    badRequestHandler("Error Deleting Teacher Experience.", res, error);
  }
};
