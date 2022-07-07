import { Injectable, Query } from '@nestjs/common';
import { PaginationParams } from 'src/auth/auth.data';
import { TransactionService } from 'src/transaction/transaction.service';
import { UserRole } from 'src/users/user.data';
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/users.service';
import { UpdateResult } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    private readonly userService: UserService,
    private readonly transactionService: TransactionService,
  ) {}
  public async isUserAdmin(userRole: string) {
    const adminRole = UserRole.admin;
    return userRole === adminRole || UserRole.super_admin;
  }

  public async deleteUser(id: number): Promise<UpdateResult> {
    return this.userService.deleteUser(id);
  }

  public findSuperAdmin(): Promise<User> {
    return this.userService.findSupeAdmin();
  }

  public findUsers(page, take) {
    return this.userService.findManyUsers(page, take);
  }

  public getTransactions(page, take) {
    return this.transactionService.adminViewTransaction(page, take);
  }
}
