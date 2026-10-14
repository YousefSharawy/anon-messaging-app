import { model, Schema } from "mongoose";
import { type } from "os";
const userSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 25,
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
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    cvPath: {
        type: String
    },
    profilePicPath: {
        type: String
    },
    coverImagesPath: [String],

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