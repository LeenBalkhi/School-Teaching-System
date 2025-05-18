import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import User from "../entities/User";

@EntityRepository(User)
class UserRepository extends Repository<User> {
  findByEmail(email: string) {
    return this.createQueryBuilder("user")
      .where("user.email = :email", { email: email })
      .addSelect("user.password")
      .getOneOrFail();
  }
}

export default getCustomRepository(UserRepository);
