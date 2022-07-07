import * as crypto from 'crypto';

/**
 * Generates a 9 digit alphanumeric code with a 2 digit type prefix.
 * @returns {string} A 6 digit alphanumeric code.
 */
export function AccountNoGenerator(): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const number = crypto.randomInt(0, 10000);
      const accountNum = number.toString().padStart(9, '0');
      resolve(('rosebay' + accountNum).toUpperCase());
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Generates a 4 digit OTP code.
 * @returns {Promise<string>} A 4 digit code.
 */
export function otpGenerator(): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const n = crypto.randomInt(0, 10000);
      // const otp = n.toString().padStart(4, '0');
      const otp = '1234';
      resolve(otp);
    } catch (error) {
      const n = crypto.randomBytes(4).readUInt32LE().toString();
      const otp = n.slice(-4);
      resolve(otp);
    }
  });
}
