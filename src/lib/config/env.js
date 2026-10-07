import { z } from 'zod';
import { config } from "dotenv";
config();
const schema = z.object({
    PORT: z.string().default('3000'),
    DB_URL: z.string(),
    JWT_SECRET: z.string(),
    SMTP_PASS: z.string(),
    REDIS_URL: z.string(),
    REDIS_HOST: z.string(),
    REDIS_PASSWORD: z.string(),
    REDIS_PORT: z.string().default('6379'),
    SMTP_USER: z.string().trim().toLowerCase(),
    GOOGLE_WEB_CLIENT_ID: z.string(),
});
const parsed = schema.parse(process.env);

export const env = {
    port: Number(parsed.PORT),
    db:{
        url:parsed.DB_URL,
    },
    redis:{
        host:parsed.REDIS_HOST,
        port:Number(parsed.REDIS_PORT),
        password:parsed.REDIS_PASSWORD,
    },
    nodemailer:{
        user : parsed.SMTP_USER,
        password : parsed.SMTP_PASS,
    },
    jwt:{
        secret:parsed.JWT_SECRET
    },
    google:{
        webClietId:parsed.GOOGLE_WEB_CLIENT_ID
    }
};