import SchoolRepo from "../repositories/School";
import SchoolDto from "../models/school.dto";
import { UserService } from "../services/index";
import { ProfileType } from "../utils/types";
import CustomResponse, { ResponseStatus } from "../utils/customResponse";
import School from "../entities/School";
import UpdateSchoolDto from "models/updateSchool.dto";

export const get = async (schoolId: string): Promise<School> => {
  const school = await SchoolRepo.findById(schoolId);
  if (!school)
    throw new CustomResponse(
      ResponseStatus.BAD_REQUEST,
      "School does not exist."
    );
  return school;
};

export const getList = async (): Promise<School[]> => {
  return await SchoolRepo.findAll();
};

export const create = async (schoolDto: SchoolDto): Promise<School> => {
  const user = await UserService.get(schoolDto.userId);
  const school: School = { ...schoolDto, user: user };
  const createdSchool = await SchoolRepo.save(school);
  // Update user profile info
  await UserService.update({
    ...user,
    profileId: createdSchool.id,
    profileType: ProfileType.SCHOOL,
  });
  return createdSchool;
};

export const update = async (
  schoolId: string,
  schoolDto: UpdateSchoolDto
): Promise<School> => {
  const school: School = await get(schoolId);
  const user = await UserService.get(school.user?.id);
  const updatedUser = { ...user, ...schoolDto };
  await UserService.update(updatedUser);
  return await SchoolRepo.save({
    ...school,
    ...schoolDto,
  });
};

export const remove = async (schoolId: string) => {
  const school: School = await get(schoolId);
  const res = await SchoolRepo.delete(school.id);
  await UserService.remove(school.user.id);
  return res;
};
