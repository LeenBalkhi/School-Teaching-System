import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import School from "../entities/School";

@EntityRepository(School)
class SchoolRepository extends Repository<School> {
  findById(id: School["id"]) {
    return this.findOne({ id }, { relations: ["user"] });
  }
  findAll() {
    return this.createQueryBuilder("school")
      .leftJoinAndSelect("school.user", "user")
      .getMany();
  }
}

export default getCustomRepository(SchoolRepository);
