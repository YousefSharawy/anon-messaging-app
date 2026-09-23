import { AppError } from '../../common/error/error.js';

export const userAlreadyExists = new AppError('User already exists', 409);
export const userDoesNotExist = new AppError('User doesn\'t exist', 404);
export const userAlreadyVerified = new AppError('User already verified', 409);
export const userIsNotVerified = new AppError('User is not verified', 403);