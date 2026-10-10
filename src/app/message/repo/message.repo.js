
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