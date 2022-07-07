import { join } from 'path';
import { config as loadEnv } from 'dotenv';
import { Transaction } from 'src/transaction/transaction.entity';
import { User } from 'src/users/user.entity';
import { DataSource } from 'typeorm';
import { DepositWithdraw } from 'src/users/depositWithdraw.entity';
loadEnv();
const DATABASE_TYPE: any = String(process.env.DB_DIALECT) || 'postgres';

const dbSource = new DataSource({
  type: DATABASE_TYPE,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_HOST),
  logging: true,
  synchronize: true,
  schema: process.env.DB_SCHEMA,
  entities: [User, Transaction, DepositWithdraw],
  migrations: ['src/migrations'],
});
export default dbSource;
