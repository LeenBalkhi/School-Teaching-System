import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import Job from "../entities/Job";

@EntityRepository(Job)
class JobRepository extends Repository<Job> {
  findById(id) {
    return this.findOne({ id }, { relations: ["experience"] });
  }
  findAll() {
    return this.createQueryBuilder("job")
      .leftJoinAndSelect("job.experience", "experience")
      .getMany();
  }
}

export default getCustomRepository(JobRepository);
