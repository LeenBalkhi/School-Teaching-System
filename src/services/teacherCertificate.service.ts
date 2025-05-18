import CustomResponse, { ResponseStatus } from "../utils/customResponse";
import TeacherCertificate from "../entities/TeacherCertificate";
import { TeacherService } from "./index";
import TeacherCertificateRepository from "../repositories/TeacherCertificate";
import Teacher from "../entities/Teacher";
import { TeacherCertificateDto } from "../models/teacherCertificate.dto";

export const create = async (
  teacherCertificateDto: TeacherCertificateDto
): Promise<TeacherCertificate> => {
  const teacher: Teacher = await TeacherService.get(
    teacherCertificateDto.teacherId
  );
  const teacherCertificate: TeacherCertificate = {
    teacher,
    ...teacherCertificateDto,
  };
  return await TeacherCertificateRepository.save(teacherCertificate);
};

export const get = async (id: string): Promise<TeacherCertificate> => {
  const teacherCertificate = await TeacherCertificateRepository.findById(id);
  if (!teacherCertificate)
    throw new CustomResponse(
      ResponseStatus.BAD_REQUEST,
      "Teacher Certificate does not exist."
    );
  return teacherCertificate;
};

export const getList = async (
  teacherId: string
): Promise<TeacherCertificate[]> => {
  await TeacherService.get(teacherId);
  return await TeacherCertificateRepository.findAll(teacherId);
};

export const update = async (
  id: string,
  teacherCertificateDto: TeacherCertificateDto
): Promise<TeacherCertificate> => {
  const teacherCertificate: TeacherCertificate = await get(id);
  return await TeacherCertificateRepository.save({
    ...teacherCertificate,
    ...teacherCertificateDto,
  });
};

export const remove = async (id: string) => {
  const teacherCertificate = await get(id);
  return await TeacherCertificateRepository.delete(teacherCertificate.id);
};
