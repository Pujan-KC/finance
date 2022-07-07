import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserContactParams } from 'src/users/user.data';
import { User } from 'src/users/user.entity';
import { UserService } from 'src/users/users.service';
import { CreateUserDTO, UserLoginDTO, VerifyUserRequest } from './auth.data';
import { AuthService } from './auth.service';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Patch('verify/:contact')
  public verifyUser(
    @Param('contact') contact: string,
    @Body() request: VerifyUserRequest,
  ): Promise<any> {
    return this.authService.verifyUser(request.otp, contact);
  }

  @Post()
  public signUp(@Body() payload: CreateUserDTO): Promise<User> {
    return this.authService.signUp(payload);
  }

  @Post('/login')
  public login(@Body() payload: UserLoginDTO) {
    return this.authService.validateUserAndLogin(payload);
  }

  @Get('sendotp/:contact')
  public sendOtp(@Param() params: UserContactParams): Promise<any> {
    return this.authService.sendOtp(params.contact);
  }
}
