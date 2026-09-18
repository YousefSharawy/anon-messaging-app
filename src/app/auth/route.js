import { Router } from "express";
const authRouter = Router();
import * as authController from './controller/auth.controller.js';
authRouter.post('/register', authController.register)
export default authRouter;