import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsUserAdmin } from '../core/guards/isUserAdmin.guard';
import { IdParams } from 'src/users/user.data';
import { UpdateResult } from 'typeorm';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';
import { PaginationParams } from 'src/auth/auth.data';
import { query } from 'express';

@Controller('admin')
@ApiBearerAuth()
@ApiTags('Admin')
@UseGuards(IsUserAdmin)
@UseGuards(AuthGuard('jwt'))
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('delete/user/:id')
  public deleteUser(@Param() param: IdParams): Promise<UpdateResult> {
    return this.adminService.deleteUser(param.id);
  }

  @Get('user')
  public getUsers(@Query() query: PaginationParams) {
    return this.adminService.findUsers(query.page, query.take);
  }

  @Get('transaction')
  public getTransactions(@Query() query: PaginationParams) {
    return this.adminService.getTransactions(query.page, query.take);
  }
}
