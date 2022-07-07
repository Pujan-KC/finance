import { GeneralInformation } from 'src/domain/entities/general.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { TransactionStatus } from './transaction.data';

@Entity('transaction')
export class Transaction extends GeneralInformation {
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
  public charge: number;

  @Column('enum', { enum: TransactionStatus })
  public status: TransactionStatus;

  @Column('text')
  public remarks: string;

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'sender' })
  public sender: User;

  @OneToOne(() => User, { eager: true })
  @JoinColumn({ name: 'receipient' })
  public receipient: User;
}
