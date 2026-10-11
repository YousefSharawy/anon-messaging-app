import { AppError } from "../../pkg/error/error.js";
import { env } from "../config/env.js";
import jwt from 'jsonwebtoken';
export function guard(req, res, next) {
    try {
        const token = req.cookies.access_token;
        if (!token) throw new AppError('No token is provided', 401);
        req.user = jwt.verify(token, env.jwt.secret);
        next();
    } catch (error) {
        next(error);
    }
}