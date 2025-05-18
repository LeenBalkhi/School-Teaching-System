import TeacherRepo from "../repositories/Teacher";
import TeacherDto from "../models/teacher.dto";
import Teacher from "../entities/Teacher";
import { UserService } from "../services/index";
import { ProfileType } from "../utils/types";
import CustomResponse, { ResponseStatus } from "../utils/customResponse";
import UpdateTeacherDto from "models/updateTeacher.dto";

export const get = async (teacherId: string): Promise<Teacher> => {
  const teacher = await TeacherRepo.findById(teacherId);
  if (!teacher)
    throw new CustomResponse(
      ResponseStatus.BAD_REQUEST,
      "Teacher Does not exist."
    );
  return teacher;
};

export const getList = async (): Promise<Teacher[]> => {
  return await TeacherRepo.findAll();
};

export const create = async (teacherDto: TeacherDto): Promise<Teacher> => {
  const user = await UserService.get(teacherDto.userId);
  const teacher: Teacher = { ...teacherDto, user: user };
  const createdTeacher = await TeacherRepo.save(teacher);
  // Update user profile info
  await UserService.update({
    ...user,
    profileId: createdTeacher.id,
    profileType: ProfileType.TEACHER,
  });
  return await get(createdTeacher.id);
};

export const update = async (
  teacherId: string,
  teacherDto: UpdateTeacherDto
): Promise<Teacher> => {
  const teacher: Teacher = await get(teacherId);
  const user = await UserService.get(teacher.user?.id);
  const updatedUser = { ...user, ...teacherDto };
  await UserService.update(updatedUser);
  return await TeacherRepo.save({
    ...teacher,
    ...teacherDto,
  });
};

export const remove = async (teacherId: string) => {
  const teacher: Teacher = await get(teacherId);
  const res = await TeacherRepo.delete(teacher.id);
  await UserService.remove(teacher.user.id);
  return res;
};
