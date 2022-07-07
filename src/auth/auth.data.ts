import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  MinLength,
  IsString,
  Length,
  IsNumberString,
} from 'class-validator';

export class UserLoginDTO {
  @ApiProperty()
  @MinLength(10)
  @IsNotEmpty()
  readonly contact: string;

  @ApiProperty()
  @MinLength(6)
  readonly password: string;
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
export class VerifyUserRequest {
  @ApiProperty()
  @Length(4, 4)
  public otp: string;
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

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  readonly confirmPassword: string;
}

export class PaginationParams {
  @ApiProperty({ default: 1 })
  @IsNumberString()
  public page: number;

  @ApiProperty({ default: 10 })
  @IsNumberString()
  public take: number;
}
