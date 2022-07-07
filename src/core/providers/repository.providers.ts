import { Transaction } from 'src/transaction/transaction.entity';
import { DepositWithdraw } from 'src/users/depositWithdraw.entity';
import { User } from 'src/users/user.entity';
import { DataSource } from 'typeorm';

export const RepositoryProviders = [
  {
    provide: 'USER_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: ['DB_SOURCE'],
  },
  {
    provide: 'TRANSACTION_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Transaction),
    inject: ['DB_SOURCE'],
  },
  {
    provide: 'DEPOSIT_WITHDRAQ_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(DepositWithdraw),
    inject: ['DB_SOURCE'],
  },
];
