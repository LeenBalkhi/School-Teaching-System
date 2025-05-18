import { CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from "typeorm";

export default abstract class EntityHistory {
  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
