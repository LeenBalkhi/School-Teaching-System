import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import Admin from "../entities/Admin";

@EntityRepository(Admin)
class AdminRepository extends Repository<Admin> {
  findById(id) {
    return this.findOne({ id });
  }
}

export default getCustomRepository(AdminRepository);
