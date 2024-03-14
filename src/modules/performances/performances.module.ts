import { Module } from '@nestjs/common';
import { PerformancesService } from './performances.service';
import { PerformancesController } from './performances.controller';
import { Performance } from './entities/performance.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Performance])],
  controllers: [PerformancesController],
  providers: [PerformancesService],
  exports: [PerformancesService]

})
export class PerformancesModule {}
