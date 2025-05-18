import CustomResponse, { ResponseStatus } from "./customResponse";
import { Response } from "express";
import Teacher from "../entities/Teacher";
import Job from "../entities/Job";
import { isNotEmpty } from "class-validator";
import { TeacherExperienceService } from "../services";

// Service Must have get & getList Functions
export const getItemOrListResponse = async (itemId: string, Service: any) => {
  try {
    let result;
    if (!itemId) result = await Service.getList();
    else result = await Service.get(itemId as string);
    return new CustomResponse(ResponseStatus.OK, null, result);
  } catch (error) {
    if (error instanceof CustomResponse) return error;
    return new CustomResponse(ResponseStatus.BAD_REQUEST, null, null, error);
  }
};

export const badRequestHandler = (
  message: string,
  res: Response,
  error?: any
) => {
  if (error instanceof CustomResponse) return res.send(error);
  res.send(
    new CustomResponse(ResponseStatus.BAD_REQUEST, message, null, error)
  );
};

export const responseHandler = (message: string, res: Response, data?: any) => {
  res.send(new CustomResponse(ResponseStatus.OK, message, data));
};

export const getPostMatchRatioWithTeacherProfile = async (
  teacher: Teacher,
  job: Job
) => {
  let result = 1,
    totalExperience = 0;
  let equalType = false,
    equalName = false;
  if (
    isNotEmpty(teacher.gender) &&
    isNotEmpty(job.gender) &&
    teacher.gender == job.gender
  ) {
    result += 1;
  }
  if (
    isNotEmpty(teacher.baccalaureate) &&
    isNotEmpty(job.baccalaureate) &&
    teacher.baccalaureate == job.baccalaureate
  ) {
    result += 1;
  }
  if (
    isNotEmpty(teacher.specialization) &&
    isNotEmpty(job.title) &&
    teacher.specialization == job.title
  ) {
    result += 1;
  }
  if (
    isNotEmpty(teacher.teachingPhase) &&
    isNotEmpty(job.teachingPhase) &&
    teacher.teachingPhase == job.teachingPhase
  ) {
    result += 1;
  }
  const jobExperience = job.experience;
  const teacherExperiences = await TeacherExperienceService.getList(teacher.id);
  if (isNotEmpty(teacherExperiences))
    for (const teacherExp of teacherExperiences) {
      let teacherExperience = teacherExp.experience;
      totalExperience += teacherExperience?.numOfYears;
      // Used to calculate the experience name & time only once in case of teacher has more than identical experience
      if (
        isNotEmpty(teacherExperience.type) &&
        isNotEmpty(jobExperience.type) &&
        teacherExperience.type == jobExperience.type &&
        !equalType
      ) {
        result += 1;
        equalType = true;
      }
      if (
        isNotEmpty(teacherExperience.name) &&
        isNotEmpty(jobExperience.name) &&
        teacherExperience.name == jobExperience.name &&
        !equalName
      ) {
        result += 1;
        equalName = true;
      }
    }
  if (
    isNotEmpty(totalExperience) &&
    isNotEmpty(jobExperience?.numOfYears) &&
    totalExperience >= jobExperience?.numOfYears
  ) {
    result += 2;
  }
  result = Math.ceil((result / 9) * 100);

  return result < 30 ? "No match" : `${result}%`;
};
