import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import TeacherExperience from "../entities/TeacherExperience";

@EntityRepository(TeacherExperience)
class TeacherExperienceRepository extends Repository<TeacherExperience> {
  findById(id: string) {
    return this.findOne(
      { id },
      { relations: ["teacher", "experience", "teacher.user"] }
    );
  }
  findAll(teacherId: string) {
    return this.createQueryBuilder("teacher_experience")
      .leftJoinAndSelect("teacher_experience.experience", "experience")
      .where("teacher_experience.teacher = :teacherId", { teacherId })
      .getMany();
  }
}

export default getCustomRepository(TeacherExperienceRepository);
