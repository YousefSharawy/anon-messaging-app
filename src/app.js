import express from "express";
import cors from 'cors';
import { globalErrorHandler } from "./pkg/error/error.handler.js";
import { router } from './routes.js';
import { correlationId } from './pkg/correlation/correlationid.js';
import cookieParser from "cookie-parser";
import { rateLimit } from 'express-rate-limit'
import { toMs } from "./pkg/utils/convert_time_units.js";
export function createApp() {
    const app = express();
    const rateLimiter = rateLimit({
        limit: 5,
        windowMs: toMs('minutes', 3),
        standardHeaders: 'draft-8',
    });

    app.use(express.json());
    app.use(cookieParser());
    app.use('/uploads', express.static('uploads'))
    app.use(cors({
        origin: 'http://localhost:4200'
    }));
    app.use(correlationId);
    app.use('/api', router);

    app.use(globalErrorHandler);

    return app;
}
