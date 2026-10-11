import express from "express";
import cors from 'cors';
import { globalErrorHandler } from "./pkg/error/error.handler.js";
import { router } from './routes.js';
import { correlationId } from './pkg/correlation/correlationid.js';
import cookieParser from "cookie-parser";
export function createApp() {
    const app = express();

    app.use(express.json());
    app.use(cookieParser());
    app.use(cors({
        origin: 'http://localhost:4200'
    }));
    app.use(correlationId);
    app.use('/api', router);

    app.use(globalErrorHandler);

    return app;
}
