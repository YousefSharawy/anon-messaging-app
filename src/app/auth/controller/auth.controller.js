import { toMs } from '../../../common/utils/convert_time_units.js';
import * as authService from '../service/auth.service.js';
export async function register(req, res, next) {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({
            message: "user created successfully",
            success: true,
            data: user,
        });
    } catch (error) {
        next(error);
    }

}
export async function verifyAccount(req, res, next) {
    try {
        const { email, code } = req.body;
        const verifiedUser = await authService.verifyAccount(email, code)
        res.status(200).json({
            message: "user verified successfully",
            success: true,
            data: verifiedUser,
        });
    } catch (error) {
        next(error)
    }
}
export async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const token = await authService.login(email, password);
        res.cookie('access_token', token, {
            httpOnly: true,
            maxAge: toMs('hours', 1),
        });
        res.status(200).json({
            message: "user logged in successfully",
            success: true,
        });
    } catch (error) {
        next(error)
    }
}
export async function sendOTP(req, res, next) {
    try {
        const { email } = req.body;
        await authService.sendOTP(email);
        res.status(200).json({
            message: "OTP has been sent to your email",
            success: true,
        });
    } catch (error) {
        next(error)
    }
}