import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { UserStatus, UserRole, PasswordForgotDto } from 'src/users/user.data';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO, UserLoginDTO, ChangePasswordDTO } from './auth.data';
import { compare, hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RoseBayConsts } from 'src/core/constants';
import { UserService } from 'src/users/users.service';
import { AccountNoGenerator, otpGenerator } from 'src/core/utils';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly jWTService: JwtService,
  ) {}

  public async validateUserAndLogin(loginDto: UserLoginDTO): Promise<any> {
    const { password } = loginDto;

    const user = await this.validateUser(loginDto);
    const match = await this.comparePassword(password, user.password);
    if (!match) {
      throw new HttpException(
        { error: 'Invalid Input' },
        HttpStatus.BAD_REQUEST,
      );
    }
    if (user.status !== 'VERIFIED') {
      return { message: 'User not Verified' };
    }

    await this.userService.update(user);
    return this.login(user);
  }
  public async signUp(payload: CreateUserDTO): Promise<User> {
    const { password, confirmPassword, ...rest } = payload;
    if (password !== confirmPassword) {
      throw new HttpException(
        { error: `Passwords Don't Match` },
        HttpStatus.BAD_REQUEST,
      );
    }
    const timestamp = new Date().toUTCString();
    const otp = await otpGenerator();
    const hashedPassword = await this.hashPassword(password);
    const accountNo = await AccountNoGenerator();
    return await this.userService.create({
      ...rest,
      password: hashedPassword,
      otp: { otp, timestamp },
    });
  }
  public async login(user: User): Promise<any> {
    const { id, role } = user;
    const [token, authToken] = await Promise.all([
      this.generateToken({ id, role }),
      this.generateToken({ id, role }, true),
    ]);

    return {
      user,
      token,
      authToken,
    };
  }

  public async verifyUser(otp: string, contact: string): Promise<any> {
    const user = await this.userService.findOneByContact(contact);
    if (!user) {
      throw new BadRequestException(
        `User Not found by given ${contact} contact`,
      );
    }
    const newuser = await this.userService.markVerified(otp, user);
    return this.login(newuser);
  }

  public async changePassword(payload: ChangePasswordDTO, id: number) {
    const { password, newPassword, confirmPassword } = payload;
    if (newPassword !== confirmPassword) {
      throw new HttpException(
        { error: `Passwords Do Not Match` },
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user)
      throw new HttpException(
        { error: 'User Not Found' },
        HttpStatus.NOT_FOUND,
      );
    const match = await this.comparePassword(password, user.password);
    if (!match)
      throw new HttpException(
        { error: 'Wrong Password' },
        HttpStatus.BAD_REQUEST,
      );
    user.password = await this.hashPassword(password);
    return await this.userRepository.save(user);
  }

  private hashPassword(password: string): Promise<string> {
    return hash(password, 10);
  }
  /**
   * Compares password.
   * @param {string} enteredPassword - Password from user login.
   * @param {string} dbPassword - Stored password
   * @returns {boolean} Is password valid?
   */
  private comparePassword(enteredPassword: string, dbPassword: string) {
    return compare(enteredPassword, dbPassword);
  }

  public async validateUser(loginDto: UserLoginDTO): Promise<User> {
    const user = await this.userService.findOneByContactWithPassword(
      loginDto.contact,
    );
    if (!user) {
      throw new HttpException(
        { error: 'User does not exist' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return user;
  }

  private generateToken(user: any, longLived = false): Promise<string> {
    return this.jWTService.signAsync(user, {
      expiresIn: longLived
        ? RoseBayConsts.AUTH_TOK_EXPIRY
        : RoseBayConsts.REFRESH_TOK_EXPIRY,
      secret: process.env.JWTKEY,
    });
  }

  public async sendOtp(contact: string): Promise<any> {
    const user = await this.userService.findOneByContact(contact);

    if (!user)
      throw new HttpException({ erro: 'user not found' }, HttpStatus.NOT_FOUND);

    const otp = await this.userService.sendOtpSms(contact);

    user.otp = { otp, timestamp: new Date().toUTCString() };
    await this.userService.update(user);

    return { message: 'otp sent', testOTP: otp };
  }

  public async forgotPassword(resetPayload: PasswordForgotDto): Promise<any> {
    const user = await this.userService.findOneByContact(resetPayload.contact);
    if (!user) {
      throw new HttpException(
        { error: 'User not found' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const elapsedTime =
      (Date.now() - Date.parse(user.otp.timestamp)) /
      RoseBayConsts.TIMESTAMP_TO_HOURS;

    if (user.otp.otp !== resetPayload.otp) {
      throw new HttpException(
        { error: 'OTP is not valid' },
        HttpStatus.BAD_REQUEST,
      );
    } else if (elapsedTime > RoseBayConsts.OTP_EXPIRY_TIME) {
      throw new HttpException(
        { error: 'OTP has expired' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const password = await this.hashPassword(resetPayload.password);
    user.password = password;
    await this.userService.update(user);
    return await this.login(user);
  }
}
