import { GeneralInformation } from 'src/domain/entities/general.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
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

  @ManyToOne(() => User)
  @JoinColumn({ name: 'recipient_id' })
  public recipient: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'sender_id' })
  public sender: User;
}
