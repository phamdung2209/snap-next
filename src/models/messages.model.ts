import mongoose, { Document, Model, PopulatedDoc, Schema, Types } from 'mongoose'
import { IUserDocument } from './user.model'

export interface IMessage {
    sender: Types.ObjectId | PopulatedDoc<IUserDocument>
    receiver: Types.ObjectId | PopulatedDoc<IUserDocument>
    content?: string
    messageType: 'text' | 'image' | 'video' | 'audio' | 'file'
    opened?: boolean
    read?: boolean
    delivered?: boolean
    deleted?: boolean
}

export interface IMessageDocument extends IMessage, Document {
    createdAt: Date
    updatedAt: Date
}

const messageSchema = new Schema<IMessageDocument>(
    {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        content: {
            type: String,
            default: '',
        },
        messageType: {
            type: String,
            enum: ['text', 'image', 'video', 'audio', 'file'],
            required: true,
        },
        opened: {
            type: Boolean,
            default: false,
        },
        read: {
            type: Boolean,
            default: false,
        },
        delivered: {
            type: Boolean,
            default: false,
        },
        deleted: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
)

const Message: Model<IMessageDocument> =
    mongoose.models?.Message ?? mongoose.model('Message', messageSchema)
export default Message
