import { model, Schema } from "mongoose";
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlenght: 3,
        maxlenght: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlenght: 25,
    },
    password: {
        type: String,
        required: function () {
            return this.provider === 'local';
        }
    },
    provider: {
        type: String,
        enum: ['local', 'google', 'facebook'],
        default: 'local',
    },
    dob: Date,
    gender: {
        type: String,
        enum: ['male', 'female'],
        default: 'male'
    },
    isVerified: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true,
        toJSON: {
            transform(doc, ret) {
                delete ret.password;
                return ret;
            }
        }
    });
export const User = model('User', userSchema);