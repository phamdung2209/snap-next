'use server'

import { auth, signIn } from '~/auth'
import { connectDB } from '~/config/connectDB.config'
import { v2 as cloudinary } from 'cloudinary'
import Message, { IMessageDocument } from '~/models/messages.model'
import Chat, { IChatDocument } from '~/models/chat.model'
import { revalidatePath, unstable_noStore as noStore } from 'next/cache'
import { redirect } from 'next/navigation'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export const authAction = async () => {
    try {
        await signIn('github') // Redirect
    } catch (error: any) {
        if (error.message === 'NEXT_REDIRECT') {
            throw error
        }

        return error.message
    }
}

export const sendMessageAction = async (
    receiverId: string,
    content: string,
    messageType: 'text' | 'image' | 'video' | 'audio' | 'file',
) => {
    noStore()
    try {
        const session = await auth()
        if (!session) return
        await connectDB()
        const { _id: senderId, id } = session?.user

        if (
            messageType === 'image' ||
            messageType === 'video' ||
            messageType === 'audio' ||
            messageType === 'file'
        ) {
            if (
                content.startsWith('data:image') ||
                content.startsWith('data:video') ||
                content.startsWith('data:audio')
            ) {
                const { secure_url } = await cloudinary.uploader.upload(content)
                content = secure_url
            }
        }

        const newMessage: IMessageDocument = await Message.create({
            sender: senderId,
            receiver: receiverId,
            content,
            messageType,
            read: false,
            delivered: false,
            deleted: false,
        })

        const chat: IChatDocument | null = await Chat.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if (!chat) {
            await Chat.create({
                participants: [senderId, receiverId],
                messages: [newMessage._id],
            })
        } else {
            chat.messages.push(newMessage._id)
            await chat.save()
        }

        // SOCKET.IO GO HERE
        // io.emit('newMessage', newMessage)

        // REVALIDATE PATH TO GET NEW MESSAGE
        revalidatePath(`/chat/${receiverId}`)
        // revalidatePath('/chat/[id]', 'page')

        return newMessage
    } catch (error: any) {
        console.log('Error in sendMessageAction (actions.ts): ', error.message)
        throw error
    }
}

export const deleteChatAction = async (userId: string) => {
    try {
        const { user } = (await auth()) || {}
        if (!user) return

        const chat: IChatDocument | null = await Chat.findOne({
            participants: { $all: [user?._id, userId] },
        })
        if (!chat) return

        const messageIds = chat.messages.map((msgId) => msgId.toString())
        await Message.deleteMany({ _id: { $in: messageIds } })
        await Chat.deleteOne({ _id: chat._id })

        revalidatePath('/chat/[id]', 'page')
    } catch (error: any) {
        console.log('Error in deleteChatAction (actions.ts): ', error.message)
        throw error
    }
    redirect('/chat')
}
