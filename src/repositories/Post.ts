import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import Post from "../entities/Post";

@EntityRepository(Post)
class PostRepository extends Repository<Post> {
  findById(id: string) {
    return this.findOne(
      { id },
      { relations: ["school", "job", "job.experience"] }
    );
  }
  findAll() {
    return (
      this.createQueryBuilder("post")
        .leftJoinAndSelect("post.school", "school")
        .leftJoinAndSelect("school.user", "user")
        .leftJoinAndSelect("post.job", "job")
        .leftJoinAndSelect("job.experience", "experience")
        // .where("post.school = :schoolId", { schoolId })
        .getMany()
    );
  }

  findAllBySchool(schoolId: string) {
    return this.createQueryBuilder("post")
      .leftJoinAndSelect("post.school", "school")
      .leftJoinAndSelect("school.user", "user")
      .leftJoinAndSelect("post.job", "job")
      .leftJoinAndSelect("job.experience", "experience")
      .where("post.school = :schoolId", { schoolId })
      .getMany();
  }
}

export default getCustomRepository(PostRepository);
