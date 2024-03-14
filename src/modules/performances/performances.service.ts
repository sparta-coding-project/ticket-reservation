import { Injectable } from '@nestjs/common';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { UpdatePerformanceDto } from './dto/update-performance.dto';
import { Performance } from './entities/performance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

@Injectable()
export class PerformancesService { 
  constructor(
    @InjectRepository(Performance)
    private readonly performancesRepository: Repository<Performance>
  ){}

  create(createPerformanceDto: CreatePerformanceDto) {
    return this.performancesRepository.save(createPerformanceDto);
  }

  search(search: string) {
    return this.performancesRepository.findBy({
      title: Like(`%${search}%`)
    })
  }

  findAll() {
    return this.performancesRepository.find();
  }

  findOne(performanceId: number) {
    return this.performancesRepository.findOne({
      where: { performanceId }
    })
  }

  update(performanceId: number, updatePerformanceDto: UpdatePerformanceDto) {
    return this.performancesRepository.update({
      performanceId
    }, updatePerformanceDto)
  }

  remove(performanceId: number) {
    return this.performancesRepository.delete({
       performanceId
    })
  }
}
