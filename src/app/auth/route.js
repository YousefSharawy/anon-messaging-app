import { Router } from "express";
const authRouter = Router();
import * as authController from './controller/auth.controller.js';
authRouter.post('/register', authController.register)
authRouter.patch('/verify-account', authController.verifyAccount)
authRouter.post('/login', authController.login)
export default authRouter;