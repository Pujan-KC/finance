import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AdminService } from '../../admin/admin.service';

/**
 * A middleware that checks if user is admin.
 *
 * @class
 * @implements {CanActivate}
 *
 * @property {function} canActivate     - Gets the request and forwards it to validator.
 * @property {function} validateRequest - Validates the request.
 * @returns  {true} if validation is successful.
 * @throws   {ForbiddenException} if validation fails.
 */
@Injectable()
export class IsUserAdmin implements CanActivate {
  constructor(private readonly adminService: AdminService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request) {
    const isUserAdmin = await this.adminService.isUserAdmin(
      request?.user?.role,
    );

    if (!isUserAdmin) {
      throw new ForbiddenException({
        error: 'User does not have sufficient permissions',
      });
    }
    return true;
  }
}
