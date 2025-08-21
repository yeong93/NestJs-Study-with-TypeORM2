import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { Cat } from './cats/entity/cats.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entity/user.entity';
import { UserAuthority } from './auth/entity/user-authority.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'dpsjwl',
      database: 'test',
      entities: [Cat, User, UserAuthority],
      synchronize: false, // 테이블 자동 생성
      logging: true, // 쿼리 로그 출력
    }),
    CatsModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
