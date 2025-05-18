import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import EntityHistory from "./EntityHistory";
import Post from "./Post";

// Questions that school adds with job post
@Entity("post_questions")
export default class PostQuestion extends EntityHistory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @ManyToOne(() => Post, (post) => post.questions)
  post: Post;
}
