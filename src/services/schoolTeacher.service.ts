import { SchoolTeacherDto } from "../models/schoolTeacher.dto";
import SchoolTeacher from "../entities/SchoolTeacher";
import { SchoolService, TeacherService } from "./index";
import SchoolTeacherRepository from "../repositories/SchoolTeacher";
import CustomResponse, { ResponseStatus } from "../utils/customResponse";

export const create = async (
  schoolTeacherDto: SchoolTeacherDto
): Promise<SchoolTeacher> => {
  const teacher = await TeacherService.get(schoolTeacherDto.teacherId);
  const school = await SchoolService.get(schoolTeacherDto.schoolId);
  const schoolTeacher: SchoolTeacher = {
    ...schoolTeacherDto,
    teacher,
    school,
  };
  return await SchoolTeacherRepository.save(schoolTeacher);
};
export const get = async (id: string) => {
  const schoolTeacher =await SchoolTeacherRepository.findById(id);
  if (!schoolTeacher)
    throw new CustomResponse(
      ResponseStatus.BAD_REQUEST,
      "School Teacher does not exist."
    );
  return schoolTeacher;
};

export const getSchoolTeachers = async (
  schoolId: string
): Promise<SchoolTeacher[]> => {
  return await SchoolTeacherRepository.findBySchool(schoolId);
};

export const getTeacherSchools = async (
  teacherId: string
): Promise<SchoolTeacher[]> => {
  return await SchoolTeacherRepository.findByTeacher(teacherId);
};

export const update = async (
  schoolTeacherId: string,
  schoolTeacherDto: SchoolTeacherDto
): Promise<SchoolTeacher> => {
  const schoolTeacher = await get(schoolTeacherId);
  const school = await SchoolService.get(schoolTeacherDto.schoolId);
  const teacher = await TeacherService.get(schoolTeacherDto.teacherId);
  const updatedSchoolTeacher = {
    ...schoolTeacherDto,
    school,
    teacher,
  };
  return await SchoolTeacherRepository.save({
    ...schoolTeacher,
    ...updatedSchoolTeacher,
  });
};

export const remove = async (schoolTeacherId: string) => {
  const schoolTeacher = await get(schoolTeacherId);
  return await SchoolTeacherRepository.delete(schoolTeacher.id);
};
