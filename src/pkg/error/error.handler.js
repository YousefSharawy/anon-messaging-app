export function globalErrorHandler( err, req, res, next) { 
          if (err.isOperational) {
            return res.status(err.statusCode).json({
                message: err.message,
                success: false,
                stack: err.stack
            });
        }
        return res.status(500).json({ message: 'Something went wrong', success: false });
}