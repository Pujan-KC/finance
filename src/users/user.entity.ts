import { GeneralInformation } from '../domain/entities/general.entity';
import { Column, Entity, Index } from 'typeorm';
import { IRejectionReason, Otp, UserRole, UserStatus } from './user.data';
import { Exclude } from 'class-transformer';
import { Transaction } from 'src/transaction/transaction.entity';

@Entity({ name: 'users' })
export class User extends GeneralInformation {
  @Column('varchar', { length: 196, nullable: true })
  public name: string;

  @Index({ unique: true })
  @Column('varchar', { length: 16, unique: true, name: 'account_no' })
  public accountNo: string;

  @Column('varchar', { unique: true, length: 15 })
  public contact: string;

  @Exclude()
  @Column('text', { select: false })
  public password: string;

  @Exclude()
  @Column('jsonb', { nullable: true, select: false })
  public otp: Otp;

  @Column('enum', { enum: UserRole, default: UserRole.user })
  public role: UserRole;

  @Column('decimal', {
    default: 0,
    transformer: {
      to(value) {
        return value;
      },
      from(value) {
        return parseFloat(value);
      },
    },
  })
  public balance: number;

  @Column('enum', { enum: UserStatus })
  public status: UserStatus;

  @Column('jsonb', { nullable: true, name: 'rejection_reason', select: false })
  public rejectionReason: IRejectionReason;
}
