import { Injectable } from '@nestjs/common';
import { UserRole } from 'src/users/user.data';
import { UserService } from 'src/users/users.service';
import { UpdateResult } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(private readonly userService: UserService) {}
  public async isUserAdmin(userRole: string) {
    const adminRole = UserRole.admin;
    return userRole === adminRole;
  }

  public async deleteUser(id: number): Promise<UpdateResult> {
    return this.userService.deleteUser(id);
  }
}
