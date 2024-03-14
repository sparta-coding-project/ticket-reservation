import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { TypedEventEmitter } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Performance } from '../performances/entities/performance.entity';
import { Point } from '../points/entities/point.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, Performance, Point])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
