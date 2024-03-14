import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async getToken({ email, password }) {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user) throw new HttpException('다른 이메일을 입력해주세요.', 401);

    if (password !== user.password)
      throw new HttpException('비밀번호가 틀렸습니다.', 401);
    const accessToken = this.jwtService.sign({userId: user.userId});
    return { accessToken };
  }
}
