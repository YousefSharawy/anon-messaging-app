import http from 'http';
import { createApp } from './app.js'
import mongoose from 'mongoose';
import { env } from './lib/config/env.js';
const app = createApp()
const server = http.createServer(app);
import { logger } from './pkg/logger/logger.js';

server.listen(env.port, () => {
    logger.info(`server started on port:${env.port}`);
})
async function shutdown() {
    logger.info('shutdown requested');
    server.close(async () => {
        await mongoose.disconnect();
        process.exit(0);
    });

}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
