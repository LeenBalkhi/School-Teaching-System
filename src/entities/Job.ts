import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import EntityHistory from "./EntityHistory";
import Experience from "./Experience";
import { BaccalaureateType, Gender, TeachingPhase } from "../utils/types";

@Entity("jobs")
export default class Job extends EntityHistory {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  hoursPerWeek: number;

  @Column()
  status: string;

  @Column({
    type: "enum",
    enum: Gender,
  })
  gender: Gender;

  @OneToOne(() => Experience)
  @JoinColumn()
  experience?: Experience;

  // New Columns
  @Column({
    type: "enum",
    enum: BaccalaureateType,
    nullable: true,
  })
  baccalaureate?: BaccalaureateType;

  @Column({
    type: "enum",
    enum: TeachingPhase,
    nullable: true,
  })
  teachingPhase?: TeachingPhase;
}
