import "./config.js"; 
import express from "express";
import './common/db/mongoose.js'
import authRouter from "./app/auth/route.js";
import userRouter from "./app/user/route.js";
import messageRouter from "./app/message/route.js";
const app = express();


app.use(express.json());

app.use('/auth',authRouter);
app.use('/user',userRouter);
app.use('/message',messageRouter);

app.use((err, req, res, next) => {
    res.status(500).json({ success: false, message: err.message });
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
})