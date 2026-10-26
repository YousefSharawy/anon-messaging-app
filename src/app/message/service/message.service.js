import * as userRepo from '../../user/repo/user.repo.js';
import * as messageRepo from '../repo/message.repo.js';
import * as authRepo from '../../auth/repo/auth.repo.js';

import { userDoesNotExist } from '../../user/errors.js'
import { AppError } from '../../../pkg/error/error.js';
import { messageNotFound, requestAlreadyExists, noRequestsFound,requestHasBeenUpdatedEarlier } from '../errors.js';
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

export async function requestSenderIdentity(recieverId, messageId) {
    const message = await messageRepo.getSenderIdForSpecificMessage(recieverId, messageId);
    if (!message) throw messageNotFound;
    const requestExisted = await messageRepo.checkRequestExistence(messageId);
    if (requestExisted) throw requestAlreadyExists;
    const request = await messageRepo.sendRequestOfSenderIdentity(message.sender, recieverId, messageId);
    return request;
}
export async function getAllRequests(userId) {
    const requests = await messageRepo.getAllRequests(userId);
    if (requests.length === 0) throw new AppError('No requests found', 200);
    return requests;
}
export async function updateRequestStatus(status, userId, messageId) {
   const request =  await messageRepo.getRequest(userId, messageId);
   if(!request) throw noRequestsFound;
   if(request.status !== 'pending') throw requestHasBeenUpdatedEarlier;
   const updatedRequest = await messageRepo.updateRequestStatus(status,userId, messageId);
    return updatedRequest;
}   