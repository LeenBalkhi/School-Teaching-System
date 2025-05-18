import PostDto from "../models/post.dto";
import CustomResponse, { ResponseStatus } from "../utils/customResponse";
import PostRepository from "../repositories/Post";
import { JobService, SchoolService, TeacherService } from "../services/index";
import School from "../entities/School";
import SchoolRepo from "../repositories/School";
import Post from "../entities/Post";
import { getPostMatchRatioWithTeacherProfile } from "../utils/helperes";

export const create = async (postDto: PostDto) => {
  const school = await SchoolService.get(postDto.schoolId);
  const job = await JobService.get(postDto.jobId);
  const post: Post = { job, school };
  return await PostRepository.save(post);
};

export const get = async (id: string, teacherId?: string) => {
  const post = await PostRepository.findById(id);
  let matchRatio;
  if (teacherId) {
    const teacher = await TeacherService.get(teacherId);
    const job = await JobService.get(post.job?.id);
    matchRatio = await getPostMatchRatioWithTeacherProfile(teacher, job);
  }
  if (!post)
    throw new CustomResponse(
      ResponseStatus.BAD_REQUEST,
      "Post does not exist."
    );
  return { ...post, matchRatio };
};

export const getList = async () => {
  return await PostRepository.findAll();
};

export const getSchoolList = async (schoolId: string) => {
  await SchoolService.get(schoolId);
  return await PostRepository.findAllBySchool(schoolId);
};

export const update = async (
  postId: string,
  postDto: PostDto
): Promise<School> => {
  const post: Post = await get(postId);
  return await SchoolRepo.save({
    ...post,
    ...postDto,
  });
};

export const remove = async (id: string) => {
  const post: Post = await get(id);
  return await SchoolRepo.delete(post.id);
};
