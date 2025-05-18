import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import Teacher from "../entities/Teacher";

@EntityRepository(Teacher)
class TeacherRepository extends Repository<Teacher> {
  findById(id) {
    return this.findOne({ id }, { relations: ["user"] });
  }
  findAll() {
    return (
      this.createQueryBuilder("teacher")
        .leftJoinAndSelect("teacher.user", "user")
        .getMany()
    );
  }
}

export default getCustomRepository(TeacherRepository);
