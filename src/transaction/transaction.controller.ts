import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PaginationParams } from 'src/auth/auth.data';
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
    @Body() payload: fundTransferDTO,
    @JwtUserDecorator() user,
  ) {
    return this.transactionService.transferFund(user.id, payload);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('sent-transaction')
  public async GettransferedHistory(
    @Query() query: PaginationParams,
    @JwtUserDecorator() user,
  ) {
    return this.transactionService.getSentHistory(
      user.id,
      query.page,
      query.take,
    );
  }
}
