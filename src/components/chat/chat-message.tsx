'use client'

import { Dialog, DialogContent } from '../ui/dialog'
import { PopulatedDoc, set } from 'mongoose'
import { Session } from 'next-auth'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { IMessageDocument } from '~/models/messages.model'

// Mock messages, only used for demo purposes
// const messages = [
//     {
//         _id: '1',
//         content: 'Hello',
//         sender: { _id: '1', fullName: 'John Doe' },
//         messageType: 'text',
//     },
//     {
//         _id: '2',
//         content: 'Heyy!',
//         sender: { _id: '2', fullName: 'Jane Doe' },
//         messageType: 'text',
//     },
//     {
//         _id: '3',
//         content: "how's it going?",
//         sender: { _id: '1', fullName: 'John Doe' },
//         messageType: 'text',
//     },
//     {
//         _id: '4',
//         content: 'Doing great! How about you?',
//         sender: { _id: '2', fullName: 'Jane Doe' },
//         messageType: 'text',
//     },
//     {
//         _id: '5',
//         content: 'Thank you! ',
//         sender: { _id: '1', fullName: 'John Doe' },
//         messageType: 'text',
//     },
//     {
//         _id: '6',
//         content: 'See you later!',
//         sender: { _id: '2', fullName: 'Jane Doe' },
//         messageType: 'text',
//     },
//     {
//         _id: '7',
//         content: 'See ya!',
//         sender: { _id: '1', fullName: 'John Doe' },
//         messageType: 'text',
//     },
// ]

type ChatMessagesProps = {
    messages: IMessageDocument[] | PopulatedDoc<IMessageDocument>[]
    session: Session | null
}

const ChatMessages = ({ messages, session }: ChatMessagesProps) => {
    const lastMsgRef = useRef<HTMLDivElement>(null)
    // const session = { user: { _id: '1' } }
    const [isPreviewingImg, setIsPreviewingImg] = useState<{
        open: boolean
        imgUrl: string
    }>({
        open: false,
        imgUrl: '',
    })

    useEffect(() => {
        const idTimer = setTimeout(() => {
            lastMsgRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 400)

        return () => clearTimeout(idTimer)
    }, [messages])

    return (
        <>
            {messages.map((message, idx) => {
                const amISender = message.sender._id === session?.user?._id
                const senderFullName = message.sender.fullname ?? message.sender.username
                const isMessageImage = message.messageType === 'image'
                const isPrevMessageFromSameSender =
                    idx > 0 && messages[idx - 1].sender._id === message.sender._id

                return (
                    <div key={message._id} className="w-full" ref={lastMsgRef}>
                        {!isPrevMessageFromSameSender && (
                            <p
                                className={`font-bold mt-2 text-xs ${
                                    amISender ? 'text-sigSnapImg' : 'text-sigSnapChat'
                                }`}
                            >
                                {amISender ? 'ME' : senderFullName}
                            </p>
                        )}
                        <div
                            className={`border-l-2 ${
                                amISender ? 'border-l-sigSnapImg' : 'border-l-sigSnapChat'
                            }`}
                        >
                            <div className={`flex items-center w-1/2 p-2 rounded-sm `}>
                                {isMessageImage ? (
                                    <div className="relative">
                                        <Image
                                            priority
                                            src={message.content}
                                            width={300}
                                            height={300}
                                            className="h-auto w-auto object-cover cursor-pointer rounded-md select-none"
                                            alt="Image"
                                            onClick={() =>
                                                setIsPreviewingImg({
                                                    open: true,
                                                    imgUrl: message.content,
                                                })
                                            }
                                        />
                                    </div>
                                ) : (
                                    <p className="text-sm">{message.content}</p>
                                )}
                            </div>
                        </div>
                    </div>
                )
            })}

            <Dialog
                open={isPreviewingImg.open}
                onOpenChange={() => setIsPreviewingImg({ open: false, imgUrl: '' })}
            >
                <DialogContent
                    className="max-w-4xl h-3/4 bg-sigMain border border-sigColorBgBorder outline-none"
                    autoFocus={false}
                >
                    <Image
                        src={isPreviewingImg.imgUrl}
                        fill
                        className="object-contain"
                        alt="image"
                    />
                </DialogContent>
            </Dialog>
        </>
    )
}
export default ChatMessages
