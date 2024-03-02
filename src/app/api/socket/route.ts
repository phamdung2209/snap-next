import { NextRequest, NextResponse } from 'next/server'
import { Server } from 'socket.io'

export const io = new Server(8080, {
    cors: {
        origin: '*',
    },
})

export const GET = async () => {
    try {
        // config socket server and listen to port

        io.on('connection', (socket) => {
            console.log('a user connected', socket.id)
            socket.on('disconnect', () => {
                console.log('user disconnected', socket.id)
            })
            socket.broadcast.emit('chat-message', 'A user has joined the chat')

            socket.on('message', (message) => {
                console.log('Message: ', message)
                io.emit('message', message)
            })

            socket.on('newMessage', (newMessage) => {
                console.log('Message from client (route.ts): ', newMessage)
                io.emit('newMessage', newMessage)
            })
        })

        return NextResponse.json({ message: 'Socket server is running' })
    } catch (error: any) {
        console.log('Error in GET /api/socket', error.message)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
