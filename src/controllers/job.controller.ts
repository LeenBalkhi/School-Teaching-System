import { NextFunction, Request, Response } from "express";
import {
  badRequestHandler,
  getItemOrListResponse,
  responseHandler,
} from "../utils/helperes";
import { JobService } from "../services/index";
import JobDto from "../models/job.dto";
import ExperienceDto from "../models/experience.dto";
import Validator from "../utils/requestValidator";

export const get = async (req: Request, res: Response) => {
  const { jobId } = req.query;
  const result = await getItemOrListResponse(jobId as string, JobService);
  return res.send(result);
};

export const create = async (req: Request, res: Response) => {
  try {
    const result = await JobService.create(
      req.body as JobDto,
      req.body as ExperienceDto
    );
    responseHandler("Job Created Successfully.", res, result);
  } catch (error) {
    badRequestHandler("Error Creating Job.", res, error);
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.query;
    const result = await JobService.update(
      jobId as string,
      req.body as JobDto,
      req.body as ExperienceDto
    );
    responseHandler("Job Updated Successfully.", res, result);
  } catch (error) {
    console.log("error ", error);
    badRequestHandler("Error Updating Job.", res, error);
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const { jobId } = req.query;
    await JobService.remove(jobId as string);
    responseHandler("Job Deleted Successfully.", res);
  } catch (error) {
    badRequestHandler("Error Deleting Job.", res, error);
  }
};

export const validateExperience = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.hasExperience) return Validator(ExperienceDto);
  next();
};
