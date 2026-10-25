import * as authRepo from '../repo/auth.repo.js';
import * as otpRepo from '../repo/otp.repo.js';
import * as userRepo from '../../user/repo/user.repo.js';
import { otpTemplate } from '../../../lib/email/otp.template.js';
import { toMs, toSec } from '../../../pkg/utils/convert_time_units.js';
import { generateOTP } from '../../../pkg/utils/otp.js'
import { userAlreadyExists, userAlreadyVerified, userDoesNotExist, userIsNotVerified } from '../../user/errors.js';
import { otpIsExpired, invalidCredentials, invalidCode } from '../errors.js';
import { generateToken } from '../../../lib/token/token.js';
import { hashPassword, comparePassword } from '../../../pkg/utils/hash/hash.js';
import { verifyGoogleToken } from '../../../lib/token/google.auth.js';
import { mailjetProvider } from '../../../lib/email/init.js';
import { cacheProvider } from '../../../lib/cache/init.js';
import { AppError } from '../../../pkg/error/error.js';
async function baseVerifyFunction(email, code, factory) {
    //check user excistence 
    const user = await authRepo.checkUserExistByEmail(email);
    // if user there -> error
    if (!user) throw userDoesNotExist;
    // if user verifired -> error 
    if (user.isVerified) throw userAlreadyVerified;
    // if not found the otp -> error
    const otp = await cacheProvider.get(`otp:${email}`);

    if (!otp) throw otpIsExpired;

    if (otp !== String(code)) throw invalidCode;
    const result = factory(user);
    await cacheProvider.del(`otp:${email}`);
    return result;

}


export async function verifyAccount(email, code) {
    await baseVerifyFunction(email, code, async () => {
        await userRepo.updateUserByEmail(email, { isVerified: true });
    });
}

export async function enable2FactorAuth(email, code) {
    await baseVerifyFunction(email, code, async () => {
        await userRepo.updateUserByEmail(email, { is2FactorAuthEnabled: true });
    });
}
export async function verify2FactorAuthCodeToLogin(email, code) {
    await baseVerifyFunction(email, code, async (user) => {
        const token = await generateToken({ id: user._id, name: user.name });
        return token;
    });
}

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
    await cacheProvider.set(`otp:${createdUser.email}`, OTP, toSec('minutes', 3));
    //send Otp
    await mailjetProvider.sendEmail(
        userData.email,
        "Verification OTP",
        otpTemplate(OTP)
    );
    return createdUser;

}
export async function login(email, password) {

    // const cachedTries = await cacheProvider.get(`login-tries:${email}`);
    // if (cachedTries === '0') throw new AppError('Too many requests', 403);

    const user = await authRepo.checkUserExistByEmail(email);
    if (!user) throw userDoesNotExist;
    if (!user.isVerified) throw userIsNotVerified;
    const match = await comparePassword(password, user.password);
    if (!match) throw invalidCredentials;

    if (user.is2FactorAuthEnabled) {
        const otp = await generateOTP();
        await cacheProvider.set(`otp:${email}`, otp, toSec('minutes', 3));
        await mailjetProvider.sendEmail(email, '2FA Code', otpTemplate(otp));
        return;
    }
    // let cachedTtl = await cacheProvider.ttl(`login-tries:${email}`);
    // const ttl = ttl==-2 ?  toSec('minutes', 3) : cachedTtl;
    // cachedTries = cachedTries ?? 4;
    // await cacheProvider.set(`login-tries:${email}`, cachedTries - 1, ttl);
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
    // await otpRepo.createOTP(
    //     {
    //         code: OTP,
    //         email: email,
    //         expiresAt: Date.now() + toMs('minutes', 5)
    //     }
    // );
    await cacheProvider.set(`otp:${email}`, OTP, toSec('minutes', 3));
    await mailjetProvider.sendEmail(
        email,
        'New OTP',
        otpTemplate(OTP),
    );
}
export async function resetPassword(email, code, newPassword) {
    const otp = await cacheProvider.get(`otp:${email}`);
    if (!otp) throw otpIsExpired;
    if (otp !== code) throw invalidCode;
    const hashedPassword = await hashPassword(newPassword);
    await userRepo.updateUserByEmail(email, { password: hashedPassword });
    await cacheProvider.del(`otp:${email}`);
}

export async function loginWithGoogle(idToken) {
    // ? 1 - verify idToken
    const payload = await verifyGoogleToken(idToken);
    // ? 2-cehck user existence
    const user = await authRepo.checkUserExistByEmail(payload.email);
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
