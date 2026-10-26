
import { Message } from '../model/message.model.js';
import { RequestsModel } from '../model/requests.model.js';
export async function createMessage(content, sender, reciever) {
    return await Message.create(
        {
            content: content,
            sender: sender,
            reciever: reciever,
        }
    );
}
export async function getAllMessages(userId) {
    return await Message.find(
        {
            reciever: userId,
        },
        {},
        {
            populate: { path: "sender" }
        }
    );
}
export async function getSenderIdForSpecificMessage(recieverId, messageId) {
    return await Message.findOne({
        _id: messageId,
        reciever: recieverId,
        isDeleted: false,
    },
    ).select({
        sender: 1
    });
}
export async function sendRequestOfSenderIdentity(requesterId, messageAuthorId, messgaeId) {
    return await RequestsModel.create({
        senderOfRequest: requesterId,
        recieverOfRequest: messageAuthorId,
        messgaeId: messgaeId,
    });
}
export async function checkRequestExistence(messageId) {
    return await RequestsModel.findOne({
        messgaeId: messageId, 
    });
}
export async function getAllRequests(userId) {
    return await RequestsModel.find({
        recieverOfRequest: userId,
    });
}
export async function getRequest(userId, messageId) {
    return await RequestsModel.findOne({
        recieverOfRequest: userId,
        messgaeId: messageId
    });
}
export async function updateRequestStatus(status, userId, messageId) {
    return await RequestsModel.updateOne({
        recieverOfRequest: userId,
        messgaeId: messageId
    },
        {
            status: status,
        }
    );
}