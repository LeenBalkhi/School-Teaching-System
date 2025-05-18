import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import EntityHistory from "./EntityHistory";
import Job from "./Job";
import School from "./School";
import Teacher from "./Teacher";
import { ProfileType } from "../utils/types";

@Entity("job_requests")
export default class JobRequest extends EntityHistory {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  status: string;

  @Column()
  sourceProfile: ProfileType;

  @ManyToOne(() => Teacher, (teacher) => teacher.receivedRequests)
  teacher: Teacher;

  @ManyToOne(() => School, (school) => school.sentRequests)
  school: School;

  @OneToOne(() => Job)
  @JoinColumn()
  job: Job;
}
