import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import SchoolTeacher from "../entities/SchoolTeacher";

@EntityRepository(SchoolTeacher)
class SchoolTeacherRepository extends Repository<SchoolTeacher> {
  findById(id) {
    return this.findOne(
      { id },
      { relations: ["school", "teacher", "school.user", "teacher.user"] }
    );
  }
  findByTeacher(teacherId: string) {
    return this.createQueryBuilder("school_teacher")
      .leftJoinAndSelect("school_teacher.school", "school")
      .leftJoinAndSelect("school.user", "user")
      .where("school_teacher.teacher = :teacherId", { teacherId })
      .getMany();
  }
  findBySchool(schoolId: string) {
    return this.createQueryBuilder("school_teacher")
      .leftJoinAndSelect("school_teacher.teacher", "teacher")
      .leftJoinAndSelect("teacher.user", "user")
      .where("school_teacher.school = :schoolId", { schoolId })
      .getMany();
  }
}

export default getCustomRepository(SchoolTeacherRepository);
