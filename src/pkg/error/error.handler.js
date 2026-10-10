import { logger } from '../logger/logger.js';
export function globalErrorHandler(err, req, res, next) {

    logger.error(err.message, {
        stack: err.stack,
        correlationId: req.correlationId,
    });
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            message: err.message,
            success: false,
            stack: err.stack
        });
    }
    return res.status(500).json({ message: 'Something went wrong', success: false });
}