import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { info } from 'console';
import { UserStatus } from 'src/users/user.data';
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { fundTransferDTO, TransactionStatus } from './transaction.data';
import { Transaction } from './transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    private readonly userService: UserService,
    @Inject('TRANSACTION_REPOSITORY')
    private readonly transactionRepository: Repository<Transaction>,
  ) {}
  public async transferFund(userId: number, payload: fundTransferDTO) {
    const sender = await this.userService.findOneById(userId);
    const { amount, recepientAccountNo, remarks } = payload;
    const superAdmin = await this.userService.findSupeAdmin();
    if (!superAdmin)
      throw new HttpException(
        { error: 'We are having some issues' },
        HttpStatus.BAD_REQUEST,
      );
    if (amount > sender.balance)
      throw new HttpException(
        { error: 'not sufficient fund' },
        HttpStatus.BAD_REQUEST,
      );

    const receipient = await this.userService.findOneByAccountNo(
      recepientAccountNo,
    );

    if (!receipient || receipient.status !== UserStatus.verified)
      throw new HttpException(
        { error: 'Acoount Validation Failed' },
        HttpStatus.BAD_REQUEST,
      );

    const charge = amount * 0.2;
    const transferableFund = amount - charge;
    sender.balance -= amount;
    receipient.balance += transferableFund;
    superAdmin.balance += charge;

    await this.userService.update(receipient);
    await this.userService.update(sender);
    await this.userService.update(superAdmin);
    return this.transactionRepository.save({
      amount,
      remarks,
      charge,
      recipient: receipient,
      sender,

      status: TransactionStatus.success,
    });
  }

  public getSentHistory(senderId, page, take) {
    return this.transactionRepository
      .createQueryBuilder('transaction')
      .leftJoin('transaction.sender', 'sender')

      .leftJoinAndSelect('transaction.recipient', 'recipient')
      .where('sender.id=:senderId', { senderId })
      .getManyAndCount();
  }

  public adminViewTransaction(page, take) {
    const skip = (page - 1) * take;
    return this.transactionRepository.findAndCount({
      relations: ['sender', 'recipient'],
      skip,
      take,
    });
  }
}
