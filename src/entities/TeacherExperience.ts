import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import EntityHistory from "./EntityHistory";
import Experience from "./Experience";
import Teacher from "./Teacher";

@Entity("teacher-experiences")
export default class TeacherExperience extends EntityHistory {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.teachingExperiences)
  teacher: Teacher;

  @OneToOne(() => Experience)
  @JoinColumn()
  experience: Experience;
}
