import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PerformancesService } from './performances.service';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { UpdatePerformanceDto } from './dto/update-performance.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('performances')
export class PerformancesController {
  constructor(private readonly performancesService: PerformancesService) {}

  @Post()
  create(@Body() createPerformanceDto: CreatePerformanceDto) {
    return this.performancesService.create(createPerformanceDto);
  }

  @Get()
  findAll() {
    return this.performancesService.findAll();
  }

  @Get("/search")
  Search(@Query() query:{search:string}){
    const {search} = query
    return this.performancesService.search(search)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.performancesService.findOne(+id);
  }

  @UseGuards(AuthGuard("jwt"))
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePerformanceDto: UpdatePerformanceDto) {
    return this.performancesService.update(+id, updatePerformanceDto);
  }

  @UseGuards(AuthGuard("jwt"))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.performancesService.remove(+id);
  }
}
