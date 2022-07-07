import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { RoseBayConsts } from 'src/core/constants';
import { AccountNoGenerator, otpGenerator } from 'src/core/utils';
import { Repository, UpdateResult } from 'typeorm';
import { UserRegisterPayload, UserRole, UserStatus } from './user.data';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private readonly userRepository: Repository<User>,
  ) {}

  public async create(user: UserRegisterPayload): Promise<User> {
    const status = UserStatus.requested;
    const role = UserRole.user;
    const accountNo = await AccountNoGenerator();

    return this.userRepository.save({ ...user, status, role, accountNo });
  }

  public findOneById(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  public async findOneByContact(contact: string) {
    return this.userRepository.findOne({ where: { contact } });
  }

  public async findOneByContactWithPassword(contact: string) {
    return this.userRepository
      .createQueryBuilder('user')
      .where('user.contact=:contact', { contact })
      .addSelect('user.password')
      .getOne();
  }

  public async markVerified(otp: string, user: User): Promise<any> {
    if (user?.otp?.otp !== null) {
      const elapsedTime =
        (Date.now() - Date.parse(user.otp.timestamp)) /
        RoseBayConsts.TIMESTAMP_TO_HOURS;
      if (user.otp.otp == otp && elapsedTime < RoseBayConsts.OTP_EXPIRY_TIME) {
        user.otp = null;
        const status = UserStatus.verified;
        user.status = status;
        return this.userRepository.save(user);
      }
    }
    throw new BadRequestException('OTP verification failed.');
  }

  public async sendOtpSms(to: string): Promise<string> {
    const otp = await otpGenerator();
    // const text = `${otp} is your one time verification code.`;

    // const response = await this.httpService
    //   .post(process.env.OTP_ADDRESS, {
    //     auth_token: process.env.SMS_TOKEN,
    //     to,
    //     text,
    //   })
    //   .toPromise();
    // if (response && response.data.error) {
    //   throw new BadRequestException(response.data.message);
    // }

    return otp;
  }

  public update(user: User) {
    return this.userRepository.save(user);
  }

  public async deleteUser(id: number): Promise<UpdateResult> {
    const savedUser = await this.userRepository.findOne({ where: { id } });
    if (!savedUser)
      throw new HttpException(
        { error: 'user not found' },
        HttpStatus.NOT_FOUND,
      );
    return this.userRepository.softDelete(savedUser.id);
  }

  public async deposit(user: User, amount: number) {
    const savedUser = await this.userRepository.findOne({
      where: { id: user.id },
    });

    const { balance, status } = savedUser;
    if (status !== UserStatus.verified)
      throw new HttpException(
        { error: 'UNVERIFIED ACCOUNT' },
        HttpStatus.BAD_REQUEST,
      );
    const newBalance = amount + balance;
    console.log(newBalance);
    savedUser.balance = newBalance;
    return this.update(savedUser);
  }

  public async withdraw(user: User, amount: number) {
    const savedUser = await this.userRepository.findOne({
      where: { id: user.id },
    });

    const { balance, status } = savedUser;
    if (status !== UserStatus.verified)
      throw new HttpException(
        { error: 'UNVERIFIED ACCOUNT' },
        HttpStatus.BAD_REQUEST,
      );
    if (amount > balance)
      throw new HttpException(
        { error: 'not sufficient fund' },
        HttpStatus.BAD_REQUEST,
      );
    const newBalance = balance - amount;
    savedUser.balance = newBalance;
    return this.update(savedUser);
  }
}
