import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import {
  BaccalaureateType,
  Gender,
  TeachingPhase,
  TeachingStatus,
} from "../utils/types";
import EntityHistory from "./EntityHistory";
import Interview from "./Interview";
import JobRequest from "./JobRequest";
import TeacherExperience from "./TeacherExperience";
import SchoolTeacher from "./SchoolTeacher";
import User from "./User";

@Entity("teachers")
export default class Teacher extends EntityHistory {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  brief?: string;

  @Column({
    type: "enum",
    enum: Gender,
  })
  gender: Gender;

  @Column()
  birthday: string;

  @Column()
  nationality: string;

  @Column({
    type: "enum",
    enum: TeachingStatus,
  })
  teachingStatus: TeachingStatus;

  @Column({
    type: "enum",
    enum: BaccalaureateType,
  })
  baccalaureate: BaccalaureateType;

  @Column()
  specialization: string;

  @Column({
    type: "enum",
    enum: TeachingPhase,
  })
  teachingPhase: TeachingPhase;

  @Column()
  university: string;

  @Column()
  cvUrl?: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Interview, (interview) => interview.teacher)
  interviews?: Interview[];

  @OneToMany(() => JobRequest, (request) => request.teacher)
  sentRequests?: JobRequest[];

  @OneToMany(() => JobRequest, (request) => request.school)
  receivedRequests?: JobRequest[];

  @OneToMany(() => SchoolTeacher, (schools) => schools.teacher)
  schools?: SchoolTeacher[];

  @OneToMany(
    () => TeacherExperience,
    (teachingExperience) => teachingExperience.teacher
  )
  teachingExperiences?: TeacherExperience[];
}
