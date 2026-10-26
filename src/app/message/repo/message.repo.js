
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
export async function sendRequestOfSenderIdentity(senderId, recieverId, messgaeId) {
    return await RequestsModel.create({
        recieverOfRequest: senderId,
        senderOfRequest: recieverId,
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
        senderOfRequest: userId,
    });
}