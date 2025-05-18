import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  JoinColumn,
  OneToOne,
} from "typeorm";
import { AgeCategory, Gender } from "../utils/types";
import EntityHistory from "./EntityHistory";
import Interview from "./Interview";
import Post from "./Post";
import JobRequest from "./JobRequest";
import SchoolTeacher from "./SchoolTeacher";
import User from "./User";

@Entity("schools")
export default class School extends EntityHistory {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    type: "enum",
    enum: Gender,
  })
  studentsGender: Gender;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @Column({
    type: "enum",
    enum: AgeCategory,
  })
  ageCategory: AgeCategory;

  @OneToMany(() => SchoolTeacher, (teachers) => teachers.school)
  teachers?: SchoolTeacher[];

  @OneToMany(() => Interview, (interview) => interview.school)
  interviews?: Interview[];

  @OneToMany(() => Post, (post) => post.school)
  posts?: Post[];

  @OneToMany(() => JobRequest, (request) => request.school)
  sentRequests?: JobRequest[];

  @OneToMany(() => JobRequest, (request) => request.teacher)
  receivedRequests?: JobRequest[];
}
