import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

/**
 * A middleware that checks if email and password is valid for protected routes.
 *
 * @class
 * @extends {PassportStrategy}
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(contact: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({
      contact,
      password,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid user credentials');
    }
    return user;
  }
}
