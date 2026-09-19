import {OTP} from '../model/otp.model.js';
export async function createOTP(OTPData) {
    return await OTP.create(OTPData); 
} 
export async function getOtpByEmail(email) {
    return await OTP.findOne({ email: email });
};
export async function deleteOtpByEmail(email) {
    return await OTP.deleteMany({ email: email });
};