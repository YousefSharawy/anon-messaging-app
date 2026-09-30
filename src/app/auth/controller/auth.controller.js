import { toMs } from '../../../common/utils/convert_time_units.js';
import * as authService from '../service/auth.service.js';
import { validateBody } from '../../../common/validation/validation.js';
import { loginDTO, registerDTO, resetPasswordDTO, sendOtpDTO, verifyAccountDTO } from '../dto/auth.dto.js';
import { date } from 'zod';
export async function register(req, res, next) {
    try {
        const data = validateBody(registerDTO, req.body);
        const user = await authService.register(data);
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
        const data = validateBody(verifyAccountDTO, req.body);
        const { email, code } = data;
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
        const data = validateBody(loginDTO, req.body);
        const { email, password } = data;
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
        const data = validateBody(sendOtpDTO, req.body);
        const { email } = date;
        await authService.sendOTP(email);
        res.status(200).json({
            message: "OTP has been sent to your email",
            success: true,
        });
    } catch (error) {
        next(error)
    }
}

export async function resetPassword(req, res, next) {
    try {
        const data = validateBody(resetPasswordDTO, req.body);
        const { email, code, newPassword } = date;
        await authService.resetPassword(email, code, newPassword);
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
}
export async function loginWithGoogle(req, res, next) {
    try {

        const token = await authService.loginWithGoogle(req.body.idToken);
        res.cookie('access_token', token, {
            httpOnly: true,
            maxAge: toMs('hours', 1),
        });
        res.status(200).json({ message: "user login successfully", success: true });
    } catch (error) {
        next(error);
    }
}