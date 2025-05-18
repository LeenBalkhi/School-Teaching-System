import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import TeacherCertificate from "../entities/TeacherCertificate";

@EntityRepository(TeacherCertificate)
class TeacherCertificateRepository extends Repository<TeacherCertificate> {
  findById(id: string) {
    return this.findOne({ id }, { relations: ["teacher", "teacher.user"] });
  }
  findAll(teacherId: string) {
    return this.createQueryBuilder("teacher_certificate")
      .where("teacher_certificate.teacher = :teacherId", { teacherId })
      .getMany();
  }
}

export default getCustomRepository(TeacherCertificateRepository);
