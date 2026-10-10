import { z } from 'zod';
import { config } from "dotenv";
config();
const schema = z.object({
    PORT: z.string().default('3000'),
    DB_URL: z.string(),
    JWT_SECRET: z.string(),
    REDIS_URL: z.string(),
    REDIS_HOST: z.string(),
    REDIS_PASSWORD: z.string(),
    REDIS_PORT: z.string().default('6379'),
    MAILJET_API_KEY: z.string(),
    MAILJET_SECRET_KEY: z.string(),
    MAILJET_FROM_NAME: z.string(),
    MAILJET_FROM_EMAIL: z.string(),
    // SMTP_PASS: z.string(),
    // SMTP_USER: z.string().trim().toLowerCase(),
    // GOOGLE_WEB_CLIENT_ID: z.string(),
});
const parsed = schema.parse(process.env);

export const env = {
    port: Number(parsed.PORT),
    db: {
        url: parsed.DB_URL,
    },
    redis: {
        host: parsed.REDIS_HOST,
        port: Number(parsed.REDIS_PORT),
        password: parsed.REDIS_PASSWORD,
    },
    // nodemailer:{
    //     user : parsed.SMTP_USER,
    //     password : parsed.SMTP_PASS,
    // },
    jwt: {
        secret: parsed.JWT_SECRET
    },
    // google:{
    //     webClietId:parsed.GOOGLE_WEB_CLIENT_ID
    // },
    mailjet: {
        apiKey: parsed.MAILJET_API_KEY,
        apiSecret: parsed.MAILJET_SECRET_KEY,
        fromName: parsed.MAILJET_FROM_NAME,
        fromEmail: parsed.MAILJET_FROM_EMAIL,
    }
};