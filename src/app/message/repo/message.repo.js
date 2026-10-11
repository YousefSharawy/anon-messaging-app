
import { Message } from '../model/message.model.js';
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