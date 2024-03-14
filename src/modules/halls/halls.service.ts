import { Injectable } from '@nestjs/common';
import { CreateHallDto } from './dto/create-hall.dto';
import { UpdateHallDto } from './dto/update-hall.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Hall } from './entities/hall.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HallsService { 
  constructor(
    @InjectRepository(Hall)
    private readonly HallsRepository: Repository<Hall>
  ){}

  create(createHallDto: CreateHallDto) {
    return this.HallsRepository.save(createHallDto);
  }

  findAll() {
    return this.HallsRepository.find();
  }

  findOne(hallId: number) {
    return this.HallsRepository.findOne({
      where: { hallId }
    })
  }

  update(hallId: number, updateHallDto: UpdateHallDto) {
    return this.HallsRepository.update({
      hallId
    }, updateHallDto)
  }

  remove(hallId: number) {
    return this.HallsRepository.delete({
       hallId
    })
  }
}
