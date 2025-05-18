import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import EntityHistory from "./EntityHistory";
import TeacherExperience from "./TeacherExperience";
import { ExperienceType } from "../utils/types";

@Entity("experiences")
export default class Experience extends EntityHistory {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  name: string;

  @Column()
  source: string;

  @Column()
  numOfYears: number;

  @Column({
    type: "enum",
    enum: ExperienceType,
  })
  type: ExperienceType;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  certificateUrl?: string;

  @OneToMany(() => TeacherExperience, (experience) => experience.teacher)
  teacherExperience?: TeacherExperience[];
}
