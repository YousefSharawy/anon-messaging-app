import { Router } from "express";
const messageRouter = Router();
import * as messageController from './controller/messsge.controller.js';
import { guard } from "../../lib/auth/guard.js";
messageRouter.post('/', messageController.sendMessage);
messageRouter.post('/public',guard ,messageController.sendMessage);
messageRouter.get('/',guard ,messageController.getAllMessages);
messageRouter.post('/request-sender-identity',guard ,messageController.sendIdentityRequest);
messageRouter.get('/get-all-requests',guard ,messageController.getAllRequests);
messageRouter.patch('/update-request-status',guard ,messageController.updateRequestStatus);
messageRouter.post('/send-conversation-message',guard ,messageController.sendMessageInConverstaion);

export default messageRouter; 