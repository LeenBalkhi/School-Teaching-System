import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import JobRequest from "../entities/JobRequest";
import { ProfileType } from "../utils/types";

@EntityRepository(JobRequest)
class JobRequestRepository extends Repository<JobRequest> {
  findById(id) {
    return this.findOne(
      { id },
      { relations: ["school", "teacher", "job", "school.user", "teacher.user"] }
    );
  }
  findBySchool(schoolId: string) {
    return this.createQueryBuilder("job_request")
      .where("job_request.school = :schoolId", { schoolId: schoolId })
      .leftJoinAndSelect("job_request.school", "school")
      .leftJoinAndSelect("school.user", "school_user")
      .leftJoinAndSelect("job_request.teacher", "teacher")
      .leftJoinAndSelect("teacher.user", "teacher_user")
      .leftJoinAndSelect("job_request.job", "job")
      .leftJoinAndSelect("job.experience", "experience")
      .getMany();
  }
  findByTeacher(teacherId: string) {
    return this.createQueryBuilder("job_request")
      .where("job_request.teacher = :teacherId", { teacherId: teacherId })
      .leftJoinAndSelect("job_request.school", "school")
      .leftJoinAndSelect("school.user", "school_user")
      .leftJoinAndSelect("job_request.teacher", "teacher")
      .leftJoinAndSelect("teacher.user", "teacher_user")
      .leftJoinAndSelect("job_request.job", "job")
      .leftJoinAndSelect("job.experience", "experience")
      .getMany();
  }

  findBySchoolAndJob(schoolId: string, jobId: string) {
    return this.createQueryBuilder("job_request")
      .where("job_request.school = :schoolId", { schoolId: schoolId })
      .andWhere("job_request.job = :jobId", {
        jobId: jobId,
      })
      .andWhere("job_request.sourceProfile = :sourceProfile", {
        sourceProfile: ProfileType.TEACHER,
      })
      .leftJoinAndSelect("job_request.school", "school")
      .leftJoinAndSelect("school.user", "school_user")
      .leftJoinAndSelect("job_request.teacher", "teacher")
      .leftJoinAndSelect("teacher.user", "teacher_user")
      .leftJoinAndSelect("job_request.job", "job")
      .leftJoinAndSelect("job.experience", "experience")
      .getMany();
  }
}

export default getCustomRepository(JobRequestRepository);
