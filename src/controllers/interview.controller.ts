import { Request, Response } from "express";
import InterviewDto from "../models/interview.dto";
import { InterviewService } from "../services";
import { badRequestHandler, responseHandler } from "../utils/helperes";
import { ProfileType } from "../utils/types";

export const get = async (req: Request, res: Response) => {
  try {
    let result;
    const { interviewId, schoolId, teacherId } = req.query;
    if (interviewId) result = await InterviewService.get(interviewId as string);
    else if (schoolId)
      result = await InterviewService.getSchoolInterviews(schoolId as string);
    else if (teacherId)
      result = await InterviewService.getTeacherInterviews(teacherId as string);
    else
      return badRequestHandler(
        "'interviewId' Or 'teacherId' Or 'schoolId' must be passed.",
        res,
        null
      );
    return responseHandler(null, res, result);
  } catch (error) {
    badRequestHandler("Error Getting Interview.", res, error);
  }
};

export const getInterviewsSchedule = async (req: Request, res: Response) => {
  try {
    let result;
    const { schoolId, teacherId } = req.query;
    if (schoolId)
      result = await InterviewService.getSchedule(
        schoolId as string,
        ProfileType.SCHOOL
      );
    else if (teacherId)
      result = await InterviewService.getSchedule(
        teacherId as string,
        ProfileType.TEACHER
      );
    else
      return badRequestHandler(
        "'teacherId' Or 'schoolId' must be passed.",
        res,
        null
      );
    return responseHandler(null, res, result);
  } catch (error) {
    badRequestHandler("Error Getting Interview.", res, error);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const result = await InterviewService.create(req.body as InterviewDto);
    responseHandler("Interview Created Successfully.", res, result);
  } catch (error) {
    badRequestHandler("Error Creating Interview.", res, error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { interviewId } = req.query;
    const result = await InterviewService.update(
      interviewId as string,
      req.body as InterviewDto
    );
    responseHandler("Interview Updated Successfully.", res, result);
  } catch (error) {
    badRequestHandler("Error Updating Interview.", res, error);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { interviewId } = req.query;
    await InterviewService.remove(interviewId as string);
    responseHandler("Interview Deleted Successfully.", res);
  } catch (error) {
    badRequestHandler("Error Deleting Interview.", res, error);
  }
};
