import { Router } from "express";
const messageRouter = Router();
import * as messageController from './controller/messsge.controller.js';
messageRouter.post('/', messageController.sendMessage);
export default messageRouter; 