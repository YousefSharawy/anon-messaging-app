import { model, Schema } from 'mongoose';

const schema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    reciever: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    messages: [
        {
            msgId: { type: Schema.Types.ObjectId, ref: 'Message', required: true },
            sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        },
    ],
},
    {
        timestamps: true
    }
);

export const Conversation = model('Conversation', schema);