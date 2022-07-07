import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtUserDecorator } from 'src/core/decorator/user.decorator';
import { CreateUserDTO, DepositWithdrawDTO, UserLoginDTO } from './user.data';
import { User } from './user.entity';
import { UserService } from './users.service';

@ApiBearerAuth()
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('deposit')
  public async deposit(
    @Body() body: DepositWithdrawDTO,
    @JwtUserDecorator() user,
  ) {
    return this.userService.deposit(user, body.amount);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('withdraw')
  public async withdraw(
    @Body() body: DepositWithdrawDTO,
    @JwtUserDecorator() user,
  ) {
    return this.userService.withdraw(user, body.amount);
  }
}
