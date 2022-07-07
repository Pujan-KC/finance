import { GeneralInformation } from 'src/domain/entities/general.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TransactionStatus } from '../transaction/transaction.data';
import { TransactionType } from './user.data';

@Entity('deposit_withdraw')
export class DepositWithdraw extends GeneralInformation {
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
  public amount: number;

  @Column('enum', { enum: TransactionStatus })
  public status: TransactionStatus;

  @Column('text')
  public remarks: string;

  @Column('enum', { enum: TransactionType })
  public action: TransactionType;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  public user: User;
}
