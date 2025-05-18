import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { ProfileType } from "../utils/types";
import EntityHistory from "./EntityHistory";

@Entity("users")
export default class User extends EntityHistory {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  isConfirmed: boolean;

  @Column({ select: false })
  password: string;

  @Column()
  address: string;

  @Column()
  imageUrl?: string;

  @Column({ nullable: true })
  fcmToken?: string;

  @Column({
    type: "enum",
    enum: ProfileType,
    nullable: true,
  })
  profileType: ProfileType;

  @Column({ nullable: true })
  profileId: string;
}
