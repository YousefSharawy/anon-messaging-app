import {OTP} from '../model/otp.model.js';
export async function createOTP(OTPData) {
    return await OTP.create(OTPData); 
} 