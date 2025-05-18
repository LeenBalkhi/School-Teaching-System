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
import PostQuestion from "./PostQuestion";
import School from "./School";

@Entity("posts")
export default class Post extends EntityHistory {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @OneToOne(() => Job)
  @JoinColumn()
  job: Job;

  @ManyToOne(() => School, (school) => school.posts)
  school: School;

  @OneToMany(() => PostQuestion, (questions) => questions.post)
  questions?: PostQuestion[];
}
