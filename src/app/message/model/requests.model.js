import { model, Schema } from 'mongoose';

const schema = new Schema({
    messgaeId: {
        type: Schema.Types.ObjectId,
        ref: 'Message',
    },
    senderOfRequest: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    recieverOfRequest: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'declined'],
        default: 'pending',
    },
},
    {
        timestamps: true,
    });

export const RequestsModel = model('RequestsModel', schema);