'use client'

import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const Socket = () => {
    const [input, setInput] = useState<string>('')
    const [messages, setMessages] = useState<string[]>([])
    // const socket = io('http://localhost:8080')

    // useEffect(() => {
    //     const getSocket = async () => {
    //         await fetch('/api/socket')
    //     }
    //     getSocket()
    // }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        // socket.on('message', (message: string) => {
        //     console.log('Messagesss: ', message)
        //     setMessages((prev) => [...prev, message])
        // })

        // if (input.trim() === '') return
        // socket.emit('message', input)
        // setInput('')
    }
    return (
        <div>
            <ul>
                {messages.map((msg: string, idx: number) => (
                    <li key={idx}>{msg}</li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default Socket
