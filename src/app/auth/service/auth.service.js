import * as authRepo from '../repo/auth.repo.js';
import * as otpRepo from '../repo/otp.repo.js';
import * as userRepo from '../../user/repo/user.repo.js';
import { sendEmail } from '../../../common/email/nodemailer.js';
import { otpTemplate } from '../../../common/email/otp.template.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { toMs } from '../../../common/utils/convert_time_units.js';
import jwt from 'jsonwebtoken';
import { generateOTP } from '../../../common/utils/otp.js'


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
    const OTP = generateOTP();
    await otpRepo.createOTP({
        code: OTP,
        email: userData.email,
        expiresAt: Date.now() + toMs('minutes', 5),
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

export async function login(email, password) {
    const user = await authRepo.checkUserExistByEmail(email);
    if (!user) throw new Error('User doesn\'t exist');
    if (user.isVerifired === false) throw new Error('User is not verified yet');
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('invalid creds');

    const token = jwt.sign({
        id: user.id,
        email: user.email,
        name: user.name
    },
        process.env.JWT_SECRET,
        {
            expiresIn: toMs('hours', 1)
        });

    return token;
}
export async function sendOTP(email) {
    const user = await authRepo.checkUserExistByEmail(email);
    if (!user) throw new Error('User doesn\'t exist');
    await otpRepo.deleteOtpByEmail(email);
    const OTP = generateOTP();
    await otpRepo.createOTP(
        {
            code: OTP,
            email: email,
            expiresAt: Date.now() + toMs('minutes', 5)
        }
    );
    await sendEmail(
        email,
        'New OTP',
        otpTemplate(OTP),
    );
}