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
export async function verifyAccount(req,res,next) {
        try {
            const {email,code} = req.body;
           const verifiedUser = await authService.verifyAccount(email,code)
            res.status(201).json({
            message: "user verified successfully", 
            success: true,
            data: verifiedUser,
        });
        } catch (error) {
            next (error)
        }
    }