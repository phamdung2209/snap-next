'use client'

import { Session } from 'next-auth'
import { useEffect } from 'react'
import { io } from 'socket.io-client'

const useListenMessages = async (session: Session) => {
    const socket = io('http://localhost:8080', {
        query: {
            userId: session?.user?._id,
        },
    })

    useEffect(() => {
        socket?.on('newMessage', (newMessage) => {
            console.log('newMessage: ', newMessage)
        })

        return () => {
            socket?.off('newMessage')
        }
    }, [socket])
}

export default useListenMessages
