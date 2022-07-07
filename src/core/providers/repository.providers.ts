import { Transaction } from 'src/transaction/transaction.entity';
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
];
