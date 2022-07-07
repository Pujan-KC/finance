import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UsersModule } from 'src/users/users.module';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [UsersModule, TransactionModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
