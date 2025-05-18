import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EntityHistory from "./EntityHistory";
import Teacher from "./Teacher";

@Entity("teacher-certificates")
export default class TeacherCertificate extends EntityHistory {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.teachingExperiences)
  teacher: Teacher;

  @Column()
  title: string;

  @Column()
  certificateUrl: string;

  @Column()
  date: string;
}
