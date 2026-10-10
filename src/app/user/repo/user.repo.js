import { User } from '../model/user.model.js';
export async function updateUserByEmail(email, newData) {
    return await User.findOneAndUpdate(
        { email: email },
        newData,
        {
            returnDocument: 'after'
        });
}
export async function findUserById(userId) {
    return await User.findOne({
        _id: userId,
        isDeleted: false,
    })

}