import CustomResponse, { ResponseStatus } from "../utils/customResponse";
import InterviewDto from "../models/interview.dto";
import InterviewRepository from "../repositories/Interview";
import Interview from "../entities/Interview";
import { JobService, SchoolService, TeacherService } from "../services";
import { ProfileType } from "../utils/types";

export const get = async (id: string): Promise<Interview> => {
  const interview = await InterviewRepository.findById(id);
  if (!interview)
    throw new CustomResponse(
      ResponseStatus.BAD_REQUEST,
      "Interview Does not exist."
    );
  return interview;
};

export const getSchedule = async (
  profileId: string,
  profileType: ProfileType
) => {
  if (profileType === ProfileType.SCHOOL)
    return await InterviewRepository.findSchoolSchedule(profileId);
  else return await InterviewRepository.findTeacherSchedule(profileId);
};

export const getTeacherInterviews = async (
  teacherId: string
): Promise<Interview[]> => {
  return await InterviewRepository.findByTeacher(teacherId);
};

export const getSchoolInterviews = async (
  schoolId: string
): Promise<Interview[]> => {
  return await InterviewRepository.findBySchool(schoolId);
};

export const create = async (
  interviewDto: InterviewDto
): Promise<Interview> => {
  const teacher = await TeacherService.get(interviewDto.teacherId);
  const school = await SchoolService.get(interviewDto.schoolId);
  const job = await JobService.get(interviewDto.jobId);
  const interview: Interview = { ...interviewDto, job, teacher, school };
  return await InterviewRepository.save(interview);
};

export const update = async (
  interviewId: string,
  interviewDto: InterviewDto
): Promise<Interview> => {
  const interview = await get(interviewId);
  const teacher = interviewDto.teacherId
    ? await TeacherService.get(interviewDto.teacherId)
    : interview.teacher;
  const school = interviewDto.schoolId
    ? await SchoolService.get(interviewDto.schoolId)
    : interview.school;
  const job = interviewDto.jobId
    ? await JobService.get(interviewDto.jobId)
    : interview.job;
  return InterviewRepository.save({
    ...interview,
    ...interviewDto,
    job,
    school,
    teacher,
  });
};

export const remove = async (interviewId: string) => {
  const interview = await get(interviewId);
  return InterviewRepository.delete(interview.id);
};
