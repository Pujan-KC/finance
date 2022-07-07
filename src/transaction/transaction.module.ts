import { Module } from '@nestjs/common';
import { DbSourceProviders } from 'src/core/providers/dbsource.providers';
import { RepositoryProviders } from 'src/core/providers/repository.providers';
import { UsersModule } from 'src/users/users.module';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [UsersModule],
  controllers: [TransactionController],
  providers: [TransactionService, ...DbSourceProviders, ...RepositoryProviders],
  exports: [TransactionService],
})
export class TransactionModule {}
