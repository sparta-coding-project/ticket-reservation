import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOneByUserId(userId: number) {
    return await this.usersRepository.findOne({
      where: { userId },
    });
  }

  findOneByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  update({
    user,
    userId,
    updateUserDto,
  }: {
    user: User;
    userId: number;
    updateUserDto: UpdateUserDto;
  }) {
    if (user.userId !== userId)
      throw new HttpException('권한이 없습니다.', 401);

    return this.usersRepository.update({ userId }, updateUserDto);
  }

  remove(userId: number) {
    return this.usersRepository.delete({ userId });
  }
}
