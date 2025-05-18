import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import Interview from "../entities/Interview";

@EntityRepository(Interview)
class InterviewRepository extends Repository<Interview> {
  findById(id: string) {
    return this.findOne(
      { id },
      { relations: ["teacher", "school", "job", "school.user", "teacher.user"] }
    );
  }
  findBySchool(schoolId: string) {
    return this.createQueryBuilder("interview")
      .leftJoinAndSelect("interview.school", "school")
      .leftJoinAndSelect("school.user", "school_user")
      .leftJoinAndSelect("interview.teacher", "teacher")
      .leftJoinAndSelect("teacher.user", "teacher_user")
      .leftJoinAndSelect("interview.job", "job")
      .leftJoinAndSelect("job.experience", "experience")
      .where("interview.school = :schoolId", { schoolId: schoolId })
      .getMany();
  }
  findByTeacher(teacherId: string) {
    return this.createQueryBuilder("interview")
      .where("interview.teacher = :teacherId", { teacherId: teacherId })
      .leftJoinAndSelect("interview.school", "school")
      .leftJoinAndSelect("school.user", "school_user")
      .leftJoinAndSelect("interview.teacher", "teacher")
      .leftJoinAndSelect("teacher.user", "teacher_user")
      .leftJoinAndSelect("job.experience", "experience")
      .leftJoinAndSelect("interview.job", "job")
      .getMany();
  }
  findTeacherSchedule(teacherId: string) {
    return this.createQueryBuilder("interview")
      .select(["interview.date_time"])
      .where("interview.teacher = :teacherId", { teacherId: teacherId })
      .getMany();
  }
  findSchoolSchedule(schoolId: string) {
    console.log("school id", schoolId);
    return this.createQueryBuilder("interview")
      .select(["interview.date_time"])
      .where("interview.school = :schoolId", { schoolId: schoolId })
      .getMany();
  }
}

export default getCustomRepository(InterviewRepository);
