import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { fundTransferDTO } from './transaction.data';

@Injectable()
export class TransactionService {
  constructor(private readonly userService: UserService) {}
  public async transferFund(user: number, payload: fundTransferDTO) {}
}
