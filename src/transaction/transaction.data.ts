import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export enum TransactionStatus {
  success = 'SUCCESSFUL',
  unsuccess = 'UNSUCCESSFUL',
  failed = 'FAILED',
  rejected = 'REJECTED',
  insuffficientFund = 'INSUFFICIENT_FUND',
}

export class fundTransferDTO {
  @ApiProperty()
  @IsString()
  public recepientAccountNo: string;

  @ApiProperty()
  @IsNumber()
  public amount: number;

  @ApiProperty()
  @IsString()
  public remarks: string;
}
