import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/utils/decorators';
import { User } from '../users/entities/user.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller('reservations')
@UseGuards(AuthGuard('jwt'))
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(
    @UserInfo() user: User,
    @Body() createReservationDto: CreateReservationDto,
  ) {
    return await this.reservationsService.create(user.userId, createReservationDto);
  }
  
  @Get()
  findByUserId(@UserInfo() user: User) {
    return this.reservationsService.findByUserId(user.userId);
  }

  @Get(':id')
  findOne(@UserInfo() user: User, @Param('id') id: string) {
    return this.reservationsService.findOne(user.userId, +id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(+id, updateReservationDto);
  }

  @Delete(':id')
  cancel(@UserInfo() user:User, @Param('id') reservationId: string) {
    return this.reservationsService.cancel(+user.userId, +reservationId);
  }
}
