import JobDto from "../models/job.dto";
import Job from "../entities/Job";
import CustomResponse, { ResponseStatus } from "../utils/customResponse";
import JobRepository from "../repositories/Job";
import { ExperienceService } from "../services/index";
import ExperienceDto from "../models/experience.dto";
import Experience from "../entities/Experience";

export const create = async (jobDto: JobDto, experienceDto: ExperienceDto) => {
  if (jobDto.hasExperience === "true") {
    const experience = await ExperienceService.create(experienceDto);
    const job: Job = { ...jobDto, experience };
    return await JobRepository.save(job);
  }
  return await JobRepository.save({ ...jobDto });
};

export const get = async (id: string): Promise<Job> => {
  const job = await JobRepository.findById(id);
  if (!job)
    throw new CustomResponse(ResponseStatus.BAD_REQUEST, "Job does not exist.");
  return job;
};

export const getList = async (): Promise<Job[]> => {
  return await JobRepository.findAll();
};

export const update = async (
  jobId: string,
  jobDto: JobDto,
  experienceDto: ExperienceDto
): Promise<Job> => {
  const job: Job = await get(jobId);
  if (jobDto.hasExperience === "true") {
    let experience: Experience;
    if (job.experience?.id)
      experience = await ExperienceService.update(
        job.experience.id,
        experienceDto
      );
    else experience = await ExperienceService.create(experienceDto);
    return await JobRepository.save({
      ...job,
      ...jobDto,
      experience,
    });
  }
  // if (job.experience?.id) await ExperienceService.remove(job.experience.id);
  return await JobRepository.save({
    ...job,
    ...jobDto,
  });
};

export const remove = async (jobId: string) => {
  const job = await get(jobId);
  const result = await JobRepository.delete(job.id);
  await ExperienceService.remove(job.experience.id);
  return result;
};
