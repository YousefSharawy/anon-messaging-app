import * as authRepo from '../repo/auth.repo.js';
import * as otpRepo from '../repo/otp.repo.js';
import * as userRepo from '../../user/repo/user.repo.js';
import { sendEmail } from '../../../common/email/nodemailer.js';
import { otpTemplate } from '../../../common/email/otp.template.js';
import { toMs, toSec } from '../../../common/utils/convert_time_units.js';
import { generateOTP } from '../../../common/utils/otp.js'
import { userAlreadyExists, userAlreadyVerified, userDoesNotExist, userIsNotVerified } from '../../user/errors.js';
import { otpIsExpired, invalidCredentials, invalidCode } from '../errors.js';
import { generateToken } from '../../../common/utils/token/token.js';
import { hashPassword, comparePassword } from '../../../common/utils/hash/hash.js';
import { verifyGoogleToken } from '../../../common/utils/token/google.auth.js';


export async function register(userData) {
    //cehck user existsence
    const userExistence = await authRepo.checkUserExistByEmail(userData.email);
    //yes->error
    if (userExistence) throw userAlreadyExists;
    //prepare data [hash password]
    userData.password = await hashPassword(userData.password);
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
    if (!user) throw userDoesNotExist;
    // if user verifired -> error 
    if (user.isVerified) throw userAlreadyVerified;
    // if not found the otp -> error
    const otp = await otpRepo.getOtpByEmail(email);
    if (!otp) throw otpIsExpired;

    if (otp.code !== String(code)) throw invalidCode;
    // update user to be verified
    const verifiedUser = await userRepo.updateUserByEmail(email, { isVerified: true });
    // delete otp
    await otpRepo.deleteOtpByEmail(email);

    return verifiedUser;

}

export async function login(email, password) {
    const user = await authRepo.checkUserExistByEmail(email);
    if (!user) throw userDoesNotExist;
    if (!user.isVerified) throw userIsNotVerified;
    const match = await comparePassword(password, user.password);
    if (!match) throw invalidCredentials;
    const token = generateToken({
        id: user.id,
        email: user.email,
        name: user.name
    })
    return token;
}

export async function sendOTP(email) {
    const user = await authRepo.checkUserExistByEmail(email);
    if (!user) throw userDoesNotExist;
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
export async function resetPassword(email, code, newPassword) {
    const otp = await otpRepo.getOtpByEmail(email);
    if (!otp) throw otpIsExpired;
    if (otp.code !== code) throw invalidCode;
    const hashedPassword = await hashPassword(newPassword);
    await userRepo.updateUserByEmail(email, { password: hashedPassword });
    await otpRepo.deleteOtpByEmail(email);
}


export async function loginWithGoogle(idToken) {
    // ? 1 - verify idToken
    const payload = await verifyGoogleToken(idToken);
    // ? 2-cehck user existence
    const user = authRepo.checkUserExistByEmail(payload.email);
    // ? if exist -> send Token
    if (user) {
        return generateToken({
            id: user.id,
            name: user.email,
        })
    }
    // ? if not -> create user and generate the token 
    const createdUser = await authRepo.createUser({
        name: payload.name,
        email: payload.email,
        provider: 'google',
        isVerified: true,
    });
    return generateToken({
        id: createdUser.id,
        email: createdUser.email
    });
}