import { Request, Response } from "express";
import { SchoolService, SchoolTeacherService } from "../services";
import { badRequestHandler, responseHandler } from "../utils/helperes";
import SchoolDto from "../models/school.dto";
import { SchoolTeacherDto } from "../models/schoolTeacher.dto";

export const get = async (req: Request, res: Response) => {
  try {
    const { teacherId, schoolId, schoolTeacherId } = req.query;
    let result;
    if (schoolTeacherId)
      result = await SchoolTeacherService.get(schoolTeacherId as string);
    else if (teacherId)
      result = await SchoolTeacherService.getTeacherSchools(
        teacherId as string
      );
    else if (schoolId)
      result = await SchoolTeacherService.getSchoolTeachers(schoolId as string);
    else
      return badRequestHandler(
        "'schoolTeacherId' Or 'teacherId' Or 'schoolId' must be passed.",
        res,
        null
      );
    responseHandler(null, res, result);
  } catch (error) {
    badRequestHandler("Error Getting School Teacher.", res, error);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const result = await SchoolTeacherService.create(
      req.body as SchoolTeacherDto
    );
    responseHandler("School Teacher Created Successfully.", res, result);
  } catch (error) {
    badRequestHandler("Error Creating School Teacher.", res, error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { schoolTeacherId } = req.query;
    const result =await SchoolTeacherService.update(
      schoolTeacherId as string,
      req.body as SchoolTeacherDto
    );
    responseHandler("School Teacher Updated Successfully.", res, result);
  } catch (error) {
    badRequestHandler("Error Updating School Teacher.", res, error);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { schoolTeacherId } = req.query;
    await SchoolTeacherService.remove(schoolTeacherId as string);
    responseHandler("School Teacher Deleted Successfully.", res);
  } catch (error) {
    badRequestHandler("Error Deleting School Teacher.", res, error);
  }
};
