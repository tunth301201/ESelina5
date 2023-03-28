import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SharedModule } from '../shared/shared.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt/jwt.strategy';
import 'dotenv/config';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    SharedModule,
    PassportModule
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
