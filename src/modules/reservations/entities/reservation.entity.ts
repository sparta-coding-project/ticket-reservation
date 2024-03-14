import { User } from 'src/modules/users/entities/user.entity';
import { Performance } from 'src/modules/performances/entities/performance.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  reservationId: number;

  @Column()
  userId: number

  @ManyToOne(()=> User, user => user.reservations)
  @JoinColumn({name: "userId", referencedColumnName: "userId"})
  user: User

  @Column()
  performanceId: number;

  @ManyToOne(() => Performance, performance => performance.reservations)
  @JoinColumn({name:"performanceId", referencedColumnName:"performanceId"})
  performance: Performance
}
