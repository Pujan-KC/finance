import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { IsUserAdmin } from '../core/guards/isUserAdmin.guard';
import { IdParams } from 'src/users/user.data';
import { UpdateResult } from 'typeorm';
import { AdminService } from './admin.service';
import { AuthGuard } from '@nestjs/passport';

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
}
