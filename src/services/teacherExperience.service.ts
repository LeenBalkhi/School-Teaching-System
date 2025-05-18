import ExperienceDto from "../models/experience.dto";
import CustomResponse, { ResponseStatus } from "../utils/customResponse";
import { TeacherExperienceDto } from "../models/teacherExperience.dto";
import TeacherExperience from "../entities/TeacherExperience";
import { ExperienceService, TeacherService } from "./index";
import Experience from "../entities/Experience";
import TeacherExperienceRepository from "../repositories/TeacherExperience";
import Teacher from "../entities/Teacher";

export const create = async (
  teacherExperienceDto: TeacherExperienceDto,
  experienceDto: ExperienceDto
): Promise<TeacherExperience> => {
  const experience: Experience = await ExperienceService.create(experienceDto);
  const teacher: Teacher = await TeacherService.get(
    teacherExperienceDto.teacherId
  );
  const teacherExperience: TeacherExperience = {
    teacher,
    experience,
  };
  return await TeacherExperienceRepository.save(teacherExperience);
};

export const get = async (id: string): Promise<TeacherExperience> => {
  const teacherExperience = await TeacherExperienceRepository.findOne(
    { id },
    { relations: ["experience"] }
  );
  if (!teacherExperience)
    throw new CustomResponse(
      ResponseStatus.BAD_REQUEST,
      "Teacher Experience does not exist."
    );
  return teacherExperience;
};

export const getList = async (
  teacherId: string
): Promise<TeacherExperience[]> => {
  await TeacherService.get(teacherId);
  return await TeacherExperienceRepository.findAll(teacherId);
};

export const update = async (
  id: string,
  experienceDto: ExperienceDto
): Promise<Experience> => {
  const teacherExperience: TeacherExperience = await get(id);
  return await ExperienceService.update(
    teacherExperience.experience.id,
    experienceDto
  );
};

export const remove = async (id: string) => {
  const teacherExperience = await get(id);
  const result = await TeacherExperienceRepository.delete(id);
  await ExperienceService.remove(teacherExperience.experience.id);
  return result;
};
