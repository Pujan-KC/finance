import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  MinLength,
} from 'class-validator';
import { User } from './user.entity';

export enum UserRole {
  user = 'USER',
  admin = 'ADMIN',
  super_admin = 'SUPER_ADMIN',
}

export enum UserStatus {
  unverified = 'UNVERIFIED',
  verified = 'VERIFIED',
  blocked = 'BLOCKED',
  requested = 'REQUESTED',
  suspended = 'SUSPENDED',
  delete_requested = 'DELETE_REQUESTED',
}

export class IdParams {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  public id: number;
}

export class PasswordForgotDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @MinLength(10)
  public contact: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  public password: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  public otp: string;
}

export class UserContactParams {
  @ApiProperty()
  // @IsMobileNumber()
  public contact: string;
}

export class Otp {
  otp: string;
  timestamp: string;
}

export class UserLoginDTO {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(10)
  // @IsMobileNumber()
  // @DontExist(User)
  readonly contact: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  readonly accountNo: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}

export class DepositWithdrawDTO {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  readonly amount: number;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly remarks: string;
}

export class UserRegisterPayload {
  @IsNotEmpty()
  readonly password: string;

  @IsNotEmpty()
  readonly contact: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  readonly otp: Otp;
}

export enum TransactionType {
  deposit = 'DEPOSIT',
  withdraw = 'WITHDRAW',
}

export class CreateUserDTO {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ type: String })
  @Length(10, 14)
  @IsNotEmpty()
  @IsString()
  readonly contact: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  readonly confirmPassword: string;
}

export class ChangePasswordDTO {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  readonly newPassword: string;
}

export interface IRejectionReason {
  title: string;
  details: string;
}
