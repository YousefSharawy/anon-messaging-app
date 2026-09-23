import { AppError } from '../../common/error/error.js';

export const otpIsExpired = new AppError('OTP expired, please resend another', 404);
export const invalidCode = new AppError('Invalid code', 400);
export const invalidCredentials = new AppError('Invalid credentials', 403);