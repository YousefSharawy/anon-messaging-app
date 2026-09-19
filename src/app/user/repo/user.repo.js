import { User } from '../model/user.model.js';
export async function updateUserByEmail(email, newData) {
    return await User.findOneAndUpdate(
        { email: email },
        newData,
        {
            returnDocument: 'after'
        });
}