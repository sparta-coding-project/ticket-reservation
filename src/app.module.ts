import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { PointsModule } from './modules/points/points.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { PerformancesModule } from './modules/performances/performances.module';
import { HallsModule } from './modules/halls/halls.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { User } from './modules/users/entities/user.entity';
import { Point } from './modules/points/entities/point.entity';
import { Reservation } from './modules/reservations/entities/reservation.entity';
import { Performance } from './modules/performances/entities/performance.entity';
import { Hall } from './modules/halls/entities/hall.entity';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PW,
      database: "ticket",
      entities:[User, Point, Reservation, Performance, Hall],
      synchronize:true
    }),
    UsersModule,
    PointsModule,
    ReservationsModule,
    PerformancesModule,
    HallsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
