import express from "express";
const app = express();
import cors from 'cors';
import { globalErrorHandler } from "./pkg/error/error.handler.js";
import { router } from './routes.js';

export function createApp() {
    app.use(express.json());
    app.use(cors({
        origin: 'http://localhost:4200'
    }));

    app.use('/api', router);

    app.use(globalErrorHandler);

    return app;
}
