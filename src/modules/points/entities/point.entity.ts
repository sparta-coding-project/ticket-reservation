import { User } from 'src/modules/users/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  Entity,
} from 'typeorm';

@Entity()
export class Point {
  @PrimaryGeneratedColumn()
  pointId: number;

  @Column()
  point: number;

  @Column()
  userId: number;

  @OneToOne(() => User, (user) => user.userId)
  @JoinColumn({ name: 'userId' })
  user: User;
}
