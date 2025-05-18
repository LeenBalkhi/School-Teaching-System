import { Request, Response } from "express";

import { badRequestHandler, responseHandler } from "../utils/helperes";
import { JobRequestService } from "../services";
import JobRequestDto from "../models/jobRequest.dto";

export const get = async (req: Request, res: Response) => {
  try {
    let result;
    const { jobRequestId, schoolId, teacherId } = req.query;
    if (jobRequestId)
      result = await JobRequestService.get(jobRequestId as string);
    else if (schoolId)
      result = await JobRequestService.getSchoolJobRequests(schoolId as string);
    else if (teacherId)
      result = await JobRequestService.getTeacherJobRequests(
        teacherId as string
      );
    else
      return badRequestHandler(
        "'jobRequestId' Or 'teacherId' Or 'schoolId' must be passed.",
        res,
        null
      );
    return responseHandler(null, res, result);
  } catch (error) {
    badRequestHandler("Error Getting JobRequest.", res, error);
  }
};

export const getListForSchoolAndJob = async (req: Request, res: Response) => {
  try {
    let result;
    const { jobId, schoolId } = req.query;
    if (jobId && schoolId)
      result = await JobRequestService.getListForSchoolAndJob(schoolId as string, jobId as string);
    else
      return badRequestHandler(
        "'jobRequestId' Or 'teacherId' Or 'schoolId' must be passed.",
        res,
        null
      );
    return responseHandler(null, res, result);
  } catch (error) {
    badRequestHandler("Error Getting JobRequest.", res, error);
  }
};

export const create = async (req: Request, res: Response) => {
  try {
    const result = await JobRequestService.create(req.body as JobRequestDto);
    responseHandler("JobRequest Created Successfully.", res, result);
  } catch (error) {
    badRequestHandler("Error Creating JobRequest.", res, error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { jobRequestId } = req.query;
    const result = await JobRequestService.update(
      jobRequestId as string,
      req.body as JobRequestDto
    );
    responseHandler("JobRequest Updated Successfully.", res, result);
  } catch (error) {
    badRequestHandler("Error Updating JobRequest.", res, error);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { jobRequestId } = req.query;
    await JobRequestService.remove(jobRequestId as string);
    responseHandler("JobRequest Deleted Successfully.", res);
  } catch (error) {
    badRequestHandler("Error Deleting JobRequest.", res, error);
  }
};
