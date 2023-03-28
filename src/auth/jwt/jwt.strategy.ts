import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
      ) {
        super({
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: process.env.JWT_SECRET,
        });
      }

  async validate(payload: JwtPayload) {
    const { email, sub, role } = payload;
    const user = await this.userService.getUserById(sub);
    if (!user) {
      throw new Error('Invalid token');
    }
    return { email, sub, role };
  }
}
