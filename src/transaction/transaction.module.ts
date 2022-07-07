import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [UsersModule],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
