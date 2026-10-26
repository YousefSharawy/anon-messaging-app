import { AppError } from "../../pkg/error/error.js";

export const messageNotFound = new AppError('Message is not found',404);
export const requestAlreadyExists = new AppError('Request is pending.',409);
export const noRequestsFound = new AppError('Can\'t fetch any requests.',404);
export const requestHasBeenUpdatedEarlier = new AppError('Request is already updated',409);