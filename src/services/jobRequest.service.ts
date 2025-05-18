import JobRequest from "entities/JobRequest";
import { JobService, SchoolService, TeacherService } from "../services";
import CustomResponse, { ResponseStatus } from "../utils/customResponse";
import JobRequestDto from "../models/jobRequest.dto";
import JobRequestRepository from "../repositories/JobRequest";
import { getPostMatchRatioWithTeacherProfile } from "../utils/helperes";

export const get = async (id: string): Promise<JobRequest> => {
  const jobRequest = await JobRequestRepository.findById(id);
  if (!jobRequest)
    throw new CustomResponse(
      ResponseStatus.BAD_REQUEST,
      "JobRequest Does not exist."
    );
  return jobRequest;
};

export const getListForSchoolAndJob = async (
  schoolId: string,
  jobId: string
): Promise<JobRequest[]> => {
  const results = await JobRequestRepository.findBySchoolAndJob(
    schoolId,
    jobId
  );
  let matchRatio,
    jobs = [];
  for (const result of results) {
    const teacher = await TeacherService.get(result.teacher.id);
    const job = await JobService.get(result.job.id);
    matchRatio = await getPostMatchRatioWithTeacherProfile(teacher, job);
    jobs.push({ ...result, matchRatio });
  }
  return jobs;
};

export const getTeacherJobRequests = async (
  teacherId: string
): Promise<JobRequest[]> => {
  return await JobRequestRepository.findByTeacher(teacherId);
};

export const getSchoolJobRequests = async (
  schoolId: string
): Promise<JobRequest[]> => {
  return await JobRequestRepository.findBySchool(schoolId);
};
export const create = async (
  jobRequestDto: JobRequestDto
): Promise<JobRequest> => {
  const teacher = await TeacherService.get(jobRequestDto.teacherId);
  const school = await SchoolService.get(jobRequestDto.schoolId);
  const job = await JobService.get(jobRequestDto.jobId);
  const jobRequest: JobRequest = { ...jobRequestDto, job, teacher, school };
  return await JobRequestRepository.save(jobRequest);
};
export const update = async (
  jobRequestId: string,
  jobRequestDto: JobRequestDto
): Promise<JobRequest> => {
  const jobRequest = await get(jobRequestId);
  const teacher = jobRequestDto.teacherId
    ? await TeacherService.get(jobRequestDto.teacherId)
    : jobRequest.teacher;
  const school = jobRequestDto.schoolId
    ? await SchoolService.get(jobRequestDto.schoolId)
    : jobRequest.school;
  const job = jobRequestDto.jobId
    ? await JobService.get(jobRequestDto.jobId)
    : jobRequest.job;
  return JobRequestRepository.save({
    ...jobRequest,
    ...jobRequestDto,
    job,
    school,
    teacher,
  });
};
export const remove = async (jobRequestId: string) => {
  const jobRequest = await get(jobRequestId);
  return JobRequestRepository.delete(jobRequest.id);
};
