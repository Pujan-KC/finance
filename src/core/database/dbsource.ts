import { join } from 'path';
import { Transaction } from 'src/transaction/transaction.entity';
import { User } from 'src/users/user.entity';
import { DataSource } from 'typeorm';

const dbSource = new DataSource({
  type: 'postgres',
  username: 'postgres',
  password: 'sakhejung7',
  database: 'finance_dev',
  host: 'localhost',
  port: 5432,
  logging: true,
  synchronize: true,
  schema: 'rosebaydev',
  entities: [User, Transaction],
  migrations: [join(__dirname, '../../src/migrations')],
  // migrations: ['src/migrations'],
});
export default dbSource;
