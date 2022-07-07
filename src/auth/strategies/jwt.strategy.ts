import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../users/users.service';

const UNAUTHORIZED_OP = 'You are not authorized to perform the operation';

/**
 * A middleware that checks if JWT is valid for protected routes.
 *
 * @class
 * @extends {PassportStrategy}
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWTKEY,
    });
  }

  /**
   * Validates the payload id to get a user.
   * @param {object} payload - The payload extracted from JWT.
   * @returns  {object} An object if validation is successful.
   * @throws   {UnauthorizedException} if validation fails.
   */
  async validate(payload: any) {
    const user = await this.userService.findOneById(payload.id);
    if (!user) {
      throw new UnauthorizedException(UNAUTHORIZED_OP);
    }
    return user;
  }
}
