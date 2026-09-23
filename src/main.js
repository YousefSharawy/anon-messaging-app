import "./config.js";
import express from "express";
import './common/db/mongoose.js'
import authRouter from "./app/auth/route.js";
import userRouter from "./app/user/route.js";
import messageRouter from "./app/message/route.js";
const app = express();
import {logger} from './common/logger/logger.js';



app.use(express.json());

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/message', messageRouter);

app.use((err, req, res, next) => {
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            message : err.message,
            success : false ,
            stack : err.stack
        });
    }
    return res.status(500).json({ message: 'Something went wrong', success: false });
});
app.listen(3000, () => {
    logger.info("Server started on port 3000");
})