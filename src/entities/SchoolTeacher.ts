import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { SchoolTeacherStatus } from "../utils/types";
import EntityHistory from "./EntityHistory";
import School from "./School";
import Teacher from "./Teacher";

@Entity("schools_teachers")
export default class SchoolTeacher extends EntityHistory {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @ManyToOne(() => Teacher, (teacher) => teacher.schools)
  teacher: Teacher;

  @ManyToOne(() => School, (school) => school.teachers)
  school: School;

  @Column({
    type: "enum",
    enum: SchoolTeacherStatus,
  })
  status: SchoolTeacherStatus;
}
