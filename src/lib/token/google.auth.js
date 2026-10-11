import { OAuth2Client } from 'google-auth-library';
import { AppError } from '../../pkg/error/error.js';
import { env } from '../config/env.js';
const client = new OAuth2Client();

export async function verifyGoogleToken(idToken) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: [`${env.google.webClietId}`],

        });
        return ticket.getPayload();
    }
    catch (err) {
        throw new AppError('Invalid Google Token', 403);
    }
}
