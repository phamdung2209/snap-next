import mongoose, { Document, Model } from 'mongoose'

export interface IUser {
    username: string
    email: string
    fullname?: string
    avatar?: string
}

export interface IUserDocument extends IUser, Document {
    createdAt: Date
    updatedAt: Date
}

const userSchema = new mongoose.Schema<IUserDocument>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
            readonly: true,
        },
        fullname: {
            type: String,
            default: '',
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            minlength: 3,
        },
        avatar: {
            type: String,
            default: '',
            trim: true,
        },
    },
    { timestamps: true },
)

const User: Model<IUserDocument> = mongoose.models?.User ?? mongoose.model('User', userSchema)
export default User
