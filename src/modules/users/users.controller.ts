import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PointsService } from '../points/points.service';
import { JwtGuard } from 'src/guards/jwt.guard';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/utils/decorators';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly pointsService: PointsService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.usersService.create(createUserDto);
    const newPoint = await this.pointsService.create(newUser.userId);
  }

  @Get()
  @UseGuards(AuthGuard("jwt"))
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':userId')
  @UseGuards(AuthGuard("jwt"))
  async findOneByUserId(@Param('userId') userId: string) {
    const user = await this.usersService.findOneByUserId(+userId);
    console.log(user)
    return user
  }

  @Patch(':userId')
  @UseGuards(AuthGuard("jwt"))
  update(
    @UserInfo() user: User,
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update({
  user,
  userId:+userId, updateUserDto
});
  }

  @Delete(':userId')
  @UseGuards(AuthGuard("jwt"))
  remove(@Param('userId') userId: string) {
    return this.usersService.remove(+userId);
  }
}
