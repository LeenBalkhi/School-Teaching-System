import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import EntityHistory from "./EntityHistory";

@Entity("admins")
export default class Admin extends EntityHistory {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;
}
