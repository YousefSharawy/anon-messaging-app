import * as userRepo from '../../user/repo/user.repo.js';
import * as messageRepo from '../repo/message.repo.js';

import { userDoesNotExist } from '../../user/errors.js'
import { AppError } from '../../../pkg/error/error.js';
import { messageNotFound, requestAlreadyExists } from '../errors.js';
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