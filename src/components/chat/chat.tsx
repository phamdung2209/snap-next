import Link from 'next/link'
import { Avatar, AvatarImage } from '../ui/avatar'
import Image from 'next/image'
import { Camera, ImageMessageSvg, TextMessageSent, TextMessageSvgReceived } from '~/assets/icons'
import { formatDate } from '~/lib/utils'

type chatProps = {
    chat: any
}

const Chat = ({ chat }: chatProps) => {
    const [userToChat] = chat.participants
    const lastMessage = chat.lastMessage
    const formattedDate = lastMessage ? formatDate(lastMessage?.createdAt) : formatDate(new Date())
    const isMsgOpened = lastMessage?.opened
    const amISender = lastMessage && lastMessage.sender._id !== userToChat._id
    const lastMessageType = lastMessage?.messageType

    let messageStatus: string
    let iconComponent: JSX.Element

    if (amISender) {
        messageStatus = isMsgOpened ? 'Opened' : 'Sent'
        iconComponent =
            lastMessageType === 'text' ? (
                <TextMessageSent
                    className={isMsgOpened ? 'text-sigSnapChat ' : 'text-sigSnapChat fill-current'}
                />
            ) : (
                <ImageMessageSvg
                    className={isMsgOpened ? 'text-sigSnapImg' : 'text-sigSnapImg fill-current'}
                />
            )
    } else {
        if (!lastMessage) {
            iconComponent = <TextMessageSvgReceived className="fill-current" />
            messageStatus = 'Say Hi!'
        } else {
            messageStatus = isMsgOpened ? 'Received' : 'Show Message'
            iconComponent =
                lastMessageType === 'text' ? (
                    <TextMessageSvgReceived
                        className={
                            !isMsgOpened ? 'text-sigSnapChat fill-current' : 'text-sigSnapChat'
                        }
                    />
                ) : (
                    <ImageMessageSvg
                        className={
                            !isMsgOpened ? 'text-sigSnapImg fill-current' : 'text-sigSnapImg'
                        }
                    />
                )
        }
    }

    return (
        <Link href={`/chat/${userToChat?._id}`}>
            <li className="flex items-center p-2  bg-sigSurface hover:bg-sigBackgroundFeedHover cursor-pointer border-b border-b-sigColorBgBorder">
                <Avatar className="w-14 h-14 bg-black">
                    <AvatarImage
                        src={
                            userToChat?.avatar ??
                            'https://questhowth.ie/wp-content/uploads/2018/04/user-placeholder.png'
                        }
                    />
                </Avatar>

                <div className="ml-3">
                    <p>{userToChat?.fullname ?? userToChat.username}</p>
                    <p className="text-gray-400 text-xs gap-1 flex">
                        {iconComponent}
                        {messageStatus} - {formattedDate}
                    </p>
                </div>

                <Camera className="ml-auto hover:scale-95 " width={20} height={20} />
            </li>
        </Link>
    )
}

export default Chat
