import * as userRepo from '../../user/repo/user.repo.js';
import * as messageRepo from '../repo/message.repo.js';
import * as authRepo from '../../auth/repo/auth.repo.js';

import { userDoesNotExist } from '../../user/errors.js'
import { AppError } from '../../../pkg/error/error.js';
import { messageNotFound, requestIsPending, noRequestsFound, requestHasBeenUpdatedEarlier, requestIsAccepted, requestIsDeclined , conversationNotFound } from '../errors.js';
export async function sendMessage(content, sender, reciever) {
    //check reciever existence 
    const user = await userRepo.findUserById(reciever);
    if (!user) {
        throw userDoesNotExist;
    }
    //save the message to databse;
    return await messageRepo.createMessage(content, sender, reciever);
}
export async function getAllMessages(userId) {
    const messages = await messageRepo.getAllMessages(userId);
    if (messages.length == 0) throw new AppError('no messages found', 404);
    return messages;
}

export async function requestSenderIdentity(requesterId, messageId) {
    const message = await messageRepo.getSenderIdForSpecificMessage(requesterId, messageId);
    if (!message) throw messageNotFound;
    const requestExisted = await messageRepo.checkRequestExistence(messageId);
    if (requestExisted) {
        const errorByStatus = {
            pending: requestIsPending,
            accepted: requestIsAccepted,
            declined: requestIsDeclined,
        };
        throw errorByStatus[requestExisted.status];
    }
    const request = await messageRepo.sendRequestOfSenderIdentity(requesterId, message.sender, messageId);
    return request;
}
export async function getAllRequests(userId) {
    const requests = await messageRepo.getAllRequests(userId);
    if (requests.length === 0) throw new AppError('No requests found', 200);
    return requests;
}
export async function updateRequestStatus(status, userId, messageId) {
    const request = await messageRepo.getRequest(userId, messageId);
    if (!request) throw noRequestsFound;
    else if (request.status !== 'pending') throw requestHasBeenUpdatedEarlier;
    const updatedRequest = await messageRepo.updateRequestStatus(status, userId, messageId);
    if (status === 'accepted') {
        await createConversation(userId, request.senderOfRequest, messageId);
    }
    return updatedRequest;
}
export async function createConversation(sender, reciever, message) {
      return await messageRepo.createConversation(sender, reciever, message);
}   
export async function sendMessageInConversation(content , sender, reciever) {
    const conversation = await messageRepo.getConversation( sender, reciever);
    if(!conversation) throw conversationNotFound;
    const message = await messageRepo.createMessage(content , sender, reciever);
    await conversation.messages.push({msgId:message.id,sender:message.sender});
    await conversation.save();
    return message ;
}   
export async function getMessagesInConversation(sender, reciever) {
    const conversation = await messageRepo.getConversation( sender, reciever);
    if(!conversation) throw conversationNotFound;
    return conversation.messages;
}   