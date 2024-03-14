import { Injectable } from '@nestjs/common';
import { CreatePointDto } from './dto/create-point.dto';
import { UpdatePointDto } from './dto/update-point.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from './entities/point.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PointsService {
  constructor(
    @InjectRepository(Point)
    private readonly pointsRepository: Repository<Point>
  ){}

  findOne(userId: number) {
    return this.pointsRepository.findOne({
      where: { userId }
    })
  }

  create(userId: number) {
    return this.pointsRepository.save({
      point:1000000,
      userId
    })
  }

  update(userId: number, updatePointDto: UpdatePointDto) {
    return `This action updates a #${userId} point`;
  }
}
