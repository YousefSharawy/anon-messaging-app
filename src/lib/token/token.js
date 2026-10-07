import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export function generateToken(payload) {
    return jwt.sign(
        payload,
         env.jwt.secret, {
        expiresIn: '1hr',
    });
}
