import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Decorator for extracting user from request.
 */
export const JwtUserDecorator = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
