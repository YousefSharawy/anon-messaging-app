import { AppError } from "../../pkg/error/error.js";

export const messageNotFound = new AppError('Message is not found',404);
export const requestAlreadyExists = new AppError('Request is pending.',409);