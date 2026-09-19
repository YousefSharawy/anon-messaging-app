import * as authRepo from '../repo/auth.repo.js';
import * as otpRepo from '../repo/otp.repo.js';
import * as userRepo from '../../user/repo/user.repo.js';
import { sendEmail } from '../../../common/email/nodemailer.js'
import { otpTemplate } from '../../../common/email/otp.template.js'
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import {toMs} from '../../../common/utils/convert_time_units.js' 



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
        expiresAt: Date.now() +toMs('minutes' , 5),
    });
    //send Otp
    await sendEmail(
        userData.email,
        "Verification OTP",
        otpTemplate(OTP)
    );
    return createdUser;

}


export async function verifyAccount(email, code) {
    //check user excistence 
    const user = await authRepo.checkUserExistByEmail(email);
    // if user there -> error
    if (!user) throw new Error('User already exist');
    // if user verifired -> error 
    if (user.isVerifired) throw new Error('User already verifired');
    // if not found the otp -> error
    const otp = await otpRepo.getOtpByEmail(email);
    if (!otp) throw new Error('OTP expired, please resend another');

    if (otp.code !== code) throw new Error('Invalid code');
    // update user to be verified
    const verifiedUser = await userRepo.updateUserByEmail(email, { isVerifired: true });
    // delete otp
    await otpRepo.deleteOtpByEmail(email);

    return verifiedUser;

}