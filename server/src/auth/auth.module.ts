import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserRepository } from 'src/repositories/user.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies.ts/jwt.strategy';
import { LocalStrategy } from './strategies.ts/local.strategy';
import { config } from '../configs/extra.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: config.jwt_secret,
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
