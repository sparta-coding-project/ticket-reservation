import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Performance } from '../performances/entities/performance.entity';
import { Point } from '../points/entities/point.entity';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>,
    @InjectRepository(Performance)
    private readonly performancesRepository: Repository<Performance>,
    @InjectRepository(Point)
    private readonly pointsRepository: Repository<Point>,
  ) {}

  async create(userId: number, createReservationDto: CreateReservationDto) {
    const performance = await this.performancesRepository.findOne({
      where: { performanceId: createReservationDto.performanceId },
    });
    const updatedPoint = await this.pointsRepository.update(
      { userId },
      { point: () => `point - ${performance.price}` },
    );
    const reservation = await this.reservationsRepository.save({userId, ...createReservationDto});
    return {updatedPoint, reservation};
  }

  findAll() {
    return this.reservationsRepository.find();
  }

  findByUserId(userId: number) {
    return this.reservationsRepository.findBy({
      userId: +userId,
    });
  }

  findOne(userId:number, reservationId: number) {
    return this.reservationsRepository.findOne({
      where: { userId, reservationId },
    });
  }

  update(reservationId: number, updateReservationDto: UpdateReservationDto) {
    return this.reservationsRepository.update(
      {
        reservationId,
      },
      updateReservationDto,
    );
  }

  remove(reservationId: number) {
    return this.reservationsRepository.delete({
      reservationId,
    });
  }
}
