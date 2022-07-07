import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtUserDecorator } from 'src/core/decorator/user.decorator';
import { fundTransferDTO } from './transaction.data';
import { TransactionService } from './transaction.service';

@ApiBearerAuth()
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}
  @UseGuards(AuthGuard('jwt'))
  @Post('transfer')
  public async transferFund(
    payload: fundTransferDTO,
    @JwtUserDecorator() user,
  ) {
    return this.transactionService.transferFund(user.id, payload);
  }
}
