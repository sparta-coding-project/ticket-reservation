import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Performance } from "src/modules/performances/entities/performance.entity";

@Entity()
export class Hall {
  @PrimaryGeneratedColumn()
  hallId: number;

  @Column()
  name: string;

  @Column()
  address: string

  @OneToMany(() => Performance, performance => performance.hall)
  performances: Performance[];


}
