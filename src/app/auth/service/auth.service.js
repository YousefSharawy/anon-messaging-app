import * as authRepo from '../repo/auth.repo.js';
import * as otpRepo from '../repo/otp.repo.js';
import { sendEmail } from '../../../common/email/nodemailer.js'
import { otpTemplate } from '../../../common/email/otp.template.js'
import bcrypt from 'bcrypt';
import crypto from 'crypto';
export async function register(userData) {
    //cehck user existsence
    const userExistence = await authRepo.checkUserExistByEmail(userData.email);
    //yes->error
    if (userExistence) throw new Error('user already exists');
    //prepare data [hash password]
    userData.password = await bcrypt.hash(userData.password, 10);
    //save user data,
    const createdUser = await authRepo.createUser(userData);
    //save otp
    const OTP = crypto.randomInt(100000, 999999).toString();
    await otpRepo.createOTP({
        code: OTP,
        email: userData.email,
        expiresAt: Date.now() + 5 * 60 * 1000
    });
    //send Otp
    await sendEmail(
        userData.email,
        "Verification OTP",
        otpTemplate(OTP)
    );
    return createdUser;

}