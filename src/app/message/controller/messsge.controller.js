import * as messageService from '../service/message.service.js';
import { validateBody } from '../../../pkg/validation/validation.js';
import { sendMessageDto } from '../dto/message.dto.js'
export async function sendMessage(req, res, next) {
    try {
        const data = validateBody(sendMessageDto, req.body);
        const sender = req.user?.id;
        const createdMessage = await messageService.sendMessage(data.content, sender,data.reciever);
        res.status(201).json({
            message: 'message created successfully',
            success: true,
            data: createdMessage,
        });
    } catch (error) {
        next(error);
    }
}