import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import Notification from "../entities/Notification";

@EntityRepository(Notification)
class NotificationRepository extends Repository<Notification> {
  findById(id) {
    return this.findOne({ id }, { relations: ["user"] });
  }
  findByUser(userId: string) {
    return this.createQueryBuilder("notification")
      .where("notification.user = :userId", { userId: userId })
      .getMany();
  }
}

export default getCustomRepository(NotificationRepository);
