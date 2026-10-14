import { userDoesNotExist } from '../errors.js';
import * as userRepo from '../repo/user.repo.js'
import fs from 'node:fs'

export async function uploadProfilePic(userId, file) {
    const user = await userRepo.findUserById(userId);
    if (!user) throw userDoesNotExist;
    if (user.profilePicPath) {
         fs.unlinkSync(user.profilePicPath); 
        }
   await  userRepo.updateUserByEmail(user.email, {
        profilePicPath: file.path,
    });
}