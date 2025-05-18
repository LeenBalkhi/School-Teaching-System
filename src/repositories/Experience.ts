import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import Experience from "../entities/Experience";

@EntityRepository(Experience)
class ExperienceRepository extends Repository<Experience> {
  findById(id) {
    return this.findOne({ id });
  }
}

export default getCustomRepository(ExperienceRepository);
