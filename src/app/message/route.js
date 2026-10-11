import { Router } from "express";
const messageRouter = Router();
import * as messageController from './controller/messsge.controller.js';
import { guard } from "../../lib/auth/guard.js";
messageRouter.post('/', messageController.sendMessage);
messageRouter.post('/public',guard ,messageController.sendMessage);
export default messageRouter; 