import { OAuth2Client } from ('google-auth-library');
import { AppError } from '../../error/error.js';

const client = new OAuth2Client();

export async function verifyGoogleToken(idToken) {
    try {
        const ticket = await client.verifyidToken({
            idToken: idToken,
            audience: `${env.process.GOOGLE_WEB_CLIENT_ID}`,

        });
        return ticket.getPayLoad();
    }
    catch (err) {
        throw new AppError('Invalid Google Token', 403);
    }
}