import { z } from 'zod';
import {AppError} from '../error/error.js'
export function validateBody(dto, body) {
    const result = z.safeParse(dto, body);
    if (result.success === false) {
        const errorMessages = result.error.issues.map(issues => `${issues.path[0]?? 'error'}: ${issues.message[0]}`);
        throw new AppError(errorMessages.join(', '), 400);
    }
    return result.data;
}