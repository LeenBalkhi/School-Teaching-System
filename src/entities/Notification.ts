import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import EntityHistory from "./EntityHistory";
import { NotificationStatus, NotificationType } from "../utils/types";
import User from "./User";

@Entity("notifications")
export default class Notification extends EntityHistory {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  itemId?: string;

  @Column()
  title: string;

  @Column()
  body: string;

  @Column()
  data?: string;

  @Column({
    type: "enum",
    enum: NotificationType,
  })
  notificationType: NotificationType;

  @Column({
    type: "enum",
    enum: NotificationStatus,
  })
  status: NotificationStatus;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
