import * as userRepo from '../../user/repo/user.repo.js';
import * as messageRepo from '../repo/message.repo.js';

import { userDoesNotExist } from '../../user/errors.js'
export async function sendMessage(content, sender, reciever) {
    //check reciever existence 
    const user = await userRepo.findUserById(reciever);
    if (!user) {
        throw userDoesNotExist;
    }
    //save the message to databse;
    return await messageRepo.createMessage(content, sender, reciever);
}