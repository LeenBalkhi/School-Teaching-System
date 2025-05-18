import ExperienceRepository from "../repositories/Experience";
import Experience from "../entities/Experience";
import ExperienceDto from "../models/experience.dto";
import CustomResponse, { ResponseStatus } from "../utils/customResponse";

export const create = async (experienceDto: ExperienceDto) => {
  const experience: Experience = formatDtoToEntity(experienceDto);
  return await ExperienceRepository.save(experience);
};

export const get = async (id: string): Promise<Experience> => {
  const experience = await ExperienceRepository.findOne({ id });
  if (!experience)
    throw new CustomResponse(
      ResponseStatus.BAD_REQUEST,
      "Experience does not exist."
    );
  return experience;
};

export const update = async (id: string, experienceDto: ExperienceDto) => {
  const experience = await get(id);
  return await ExperienceRepository.save({
    ...experience,
    ...formatDtoToEntity(experienceDto),
  });
};

export const remove = async (id: string) => {
  await get(id);
  return await ExperienceRepository.delete(id);
};

const formatDtoToEntity = (experienceDto: ExperienceDto): Experience => {
  return {
    name: experienceDto.experienceName,
    type: experienceDto.experienceType,
    source: experienceDto.experienceSource,
    numOfYears: experienceDto.experienceNumOfYears,
    certificateUrl: experienceDto.experienceCertificateUrl,
    description: experienceDto.experienceDescription,
  };
};
