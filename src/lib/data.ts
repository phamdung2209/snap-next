import { auth } from '~/auth'
import Chat, { IChat, IChatDocument } from '~/models/chat.model'
import Message, { IMessageDocument } from '~/models/messages.model'
import User, { IUserDocument } from '~/models/user.model'

export const getUsersForSidebar = async (authUserId: string) => {
    try {
        const users: IUserDocument[] = await User.find({ _id: { $ne: authUserId } })
        const userInfo = await Promise.all(
            users.map(async (user) => {
                const lastMessage: IMessageDocument | null = await Message.findOne({
                    $or: [
                        {
                            sender: user._id,
                            receiver: authUserId,
                        },
                        {
                            sender: authUserId,
                            receiver: user._id,
                        },
                    ],
                })
                    .sort({ createdAt: -1 })
                    .populate('sender', '_id fullname avatar')
                    .populate('receiver', '_id fullname avatar')
                    .exec()

                return {
                    _id: user._id,
                    participants: [user],
                    lastMessage: lastMessage
                        ? {
                              ...lastMessage.toJSON(),
                              // sender: lastMessage.sender._id.toString() === authUserId ? 'You' : lastMessage.sender._id,
                              sender: lastMessage.sender,
                              receiver: lastMessage.receiver,
                          }
                        : null,
                }
            }),
        )

        return userInfo
    } catch (error) {
        console.log('Error in getUsersForSidebar (data.ts): ', error)
        throw error
    }
}

export const getUserProfile = async (userId: string) => {
    try {
        const user: IUserDocument | null = await User.findById(userId)
        if (!user) throw new Error('User not found')
        return user
    } catch (error: any) {
        console.log('Error in getUserProfile (data.ts): ', error.message)
        throw error
    }
}

export const getMessages = async (authUserId: string, otherUserId: string) => {
    try {
        const chat: IChatDocument | null = await Chat.findOne({
            participants: { $all: [authUserId, otherUserId] },
        }).populate({
            path: 'messages',
            populate: {
                path: 'sender',
                model: 'User',
                select: 'fullname username',
            },
        })

        if (!chat) return []

        return JSON.parse(JSON.stringify(chat.messages))
    } catch (error) {
        console.log('Error in getMessages (data.ts): ', error)
        throw error
    }
}
