import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import PostQuestion from "../entities/PostQuestion";

@EntityRepository(PostQuestion)
class PostQuestionRepository extends Repository<PostQuestion> {
  findById(id) {
    return this.findOne({ id });
  }
}

export default getCustomRepository(PostQuestionRepository);
