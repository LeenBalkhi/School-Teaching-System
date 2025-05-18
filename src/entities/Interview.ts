import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import EntityHistory from "./EntityHistory";
import School from "./School";
import Teacher from "./Teacher";
import Job from "./Job";
import { InterviewStatus } from "../utils/types";

@Entity("interviews")
export default class Interview extends EntityHistory {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    type: "datetime",
  })
  date_time: string;

  @Column({ type: "enum", enum: InterviewStatus })
  status: InterviewStatus;

  @Column()
  location: string;

  @OneToOne(() => Teacher)
  @JoinColumn()
  teacher: Teacher;

  @OneToOne(() => School)
  @JoinColumn()
  school: School;

  @OneToOne(() => Job)
  @JoinColumn()
  job: Job;
}
