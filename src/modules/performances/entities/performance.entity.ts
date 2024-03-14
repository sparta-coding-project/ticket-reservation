import { Hall } from 'src/modules/halls/entities/hall.entity';
import { Reservation } from 'src/modules/reservations/entities/reservation.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Performance {
  @PrimaryGeneratedColumn()
  performanceId: number;

  @Column()
  title: string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column()
  price: number;

  @ManyToOne(() => Hall, hall => hall.performances)
  @JoinColumn({name: 'hallId'})
  hall: Hall

  @OneToMany(() => Reservation, reservation => reservation.performance)
  reservations: Reservation[]
}
