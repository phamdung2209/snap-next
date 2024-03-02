'use client'

import { Dialog, DialogContent } from '../ui/dialog'
import { PopulatedDoc } from 'mongoose'
import { Session } from 'next-auth'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { IMessageDocument } from '~/models/messages.model'

type ChatMessagesProps = {
    messages: IMessageDocument[] | PopulatedDoc<IMessageDocument>[]
    session: Session | null
}

const ChatMessages = ({ messages, session }: ChatMessagesProps) => {
    const { id: receiverId } = useParams<{ id: string }>()
    const lastMsgRef = useRef<HTMLDivElement>(null)
    const [isPreviewingImg, setIsPreviewingImg] = useState<{
        open: boolean
        imgUrl: string
    }>({
        open: false,
        imgUrl: '',
    })
    const [mess, setMess] = useState<IMessageDocument[]>(messages)

    // SOCKET IO IMPLEMENTATION HERE
    useEffect(() => {
        const getSocket = async () => {
            await fetch('/api/socket')
        }
        getSocket()
    }, [])
    const socket = io('http://localhost:8080', {
        query: {
            userId: session?.user?._id,
        },
    })

    useEffect(() => {
        socket?.on('newMessage', (newMessage: any) => {
            socket.emit('newMessage', newMessage)
            console.log('newMessage: ', newMessage)
            setMess(() => [newMessage])
        })

        return () => {
            socket?.off('newMessage')
        }
    }, [socket, mess, receiverId, session?.user?._id])

    useEffect(() => {
        const idTimer = setTimeout(() => {
            lastMsgRef.current?.scrollIntoView({ behavior: 'smooth' })
        }, 400)

        return () => clearTimeout(idTimer)
    }, [messages])

    // PUSHER IMPLEMENTATION HERE

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
