import { IsEnum } from 'class-validator';
import { Point } from 'src/modules/points/entities/point.entity';
import { Reservation } from 'src/modules/reservations/entities/reservation.entity';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

export enum ROLE {
  BIZ = 'BIZ',
  CUSTOMER = 'CUSTOMER',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  email: string;

  @Column({ nullable: true })
  nickname: string;

  @Column()
  password: string;

  @Column()
  @IsEnum(ROLE)
  role: ROLE;

  @OneToMany(() => Reservation, reservation => reservation.user)
  reservations: Reservation[]
}
