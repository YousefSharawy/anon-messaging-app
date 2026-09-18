import { model, Schema } from 'mongoose';

const messageModel = new Schema({
    content: {
        type: String,
        required: true,
        trim: true,
        minlenght: 1,
        maxlenght: 200,
    },
    reciever: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    isDeleted: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
});
export const Message = model('Message', messageModel);