import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { DataSource, Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Performance } from '../performances/entities/performance.entity';
import { Point } from '../points/entities/point.entity';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(Reservation)
    private readonly reservationsRepository: Repository<Reservation>,
    @InjectRepository(Performance)
    private readonly performancesRepository: Repository<Performance>,
    @InjectRepository(Point)
    private readonly pointsRepository: Repository<Point>,
  ) {}

  async create(userId: number, createReservationDto: CreateReservationDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    const performance = await this.performancesRepository.findOne({
      where: { performanceId: createReservationDto.performanceId },
    });

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try{
      await queryRunner.manager.update("Point", {userId}, { point: () => `point - ${performance.price}` })
      await queryRunner.manager.save("Reservation", {
        userId, ...createReservationDto
      })
    }catch(error){
      await queryRunner.rollbackTransaction()
    }finally{
      await queryRunner.release()
    }
  }

  findAll() {
    return this.reservationsRepository.find();
  }

  findByUserId(userId: number) {
    return this.reservationsRepository.findBy({
      userId: +userId,
    });
  }

  findOne(userId: number, reservationId: number) {
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

  async cancel(userId: number, reservationId: number) {
    const queryRunner = this.dataSource.createQueryRunner();
    const reservation = await this.reservationsRepository.findOne({
      where: { reservationId },
    });
    const performance = await this.performancesRepository.findOne({
      where: { performanceId: reservation.performanceId },
    });

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.update(
        Point,
        { userId },
        { point: () => `point + ${performance.price}` },
      );
      await queryRunner.manager.delete('Reservation', { reservationId });
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
