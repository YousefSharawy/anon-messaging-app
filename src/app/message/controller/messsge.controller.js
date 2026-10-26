import * as messageService from '../service/message.service.js';
import { validateBody } from '../../../pkg/validation/validation.js';
import { sendMessageDto } from '../dto/message.dto.js'
export async function sendMessage(req, res, next) {
    try {
        const data = validateBody(sendMessageDto, req.body);
        const sender = req.user?.id;
        const createdMessage = await messageService.sendMessage(data.content, sender, data.reciever);
        res.status(201).json({
            message: 'message created successfully',
            success: true,
            data: createdMessage,
        });
    } catch (error) {
        next(error);
    }
}
export async function getAllMessages(req, res, next) {
    try {
        const messages = await messageService.getAllMessages(req.user.id);
        res.status(200).json({
            message: "messages retrieved successfully",
            success: true,
            data: messages,
        });
    } catch (error) {
        next(error);
    }
}
export async function sendIdentityRequest(req, res, next) {
    try {
        const { recieverId, messageId } = req.body;
        const request = await messageService.requestSenderIdentity(recieverId, messageId);
        res.status(201).json({
            message: "Request has been sent to the sender of message",
            success: true
        });
    } catch (error) {
        next(error)
    }
}
export async function getAllRequests(req, res, next) {
    try {
        const requests = await messageService.getAllRequests(req.user.id);
        console.log(req.user);
        res.status(200).json({
            message: "Requests:",
            success: true,
            requests: requests
        });
    } catch (error) {
        next(error)
    }
}