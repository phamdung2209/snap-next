'use client'

import { Button } from '../ui/button'
import { Camera, TextMessageSent } from '~/assets/icons'
import { Input } from '../ui/input'
import { EmojiPopover } from './emoji-popover'
import { useRef, useState } from 'react'
import { sendMessageAction } from '~/lib/actions'
import { useParams } from 'next/navigation'
import { MESSAGE_TYPES, readFileAsDataURL } from '~/lib/utils'
import { Loader2 } from 'lucide-react'

const SendMsgInput = () => {
    const [msg, setMsg] = useState('')
    const [loading, setLoading] = useState<boolean>(false)

    const imgRef = useRef<HTMLInputElement>(null)
    const { id: receiverId } = useParams<{ id: string }>()

    const handleSendMsg = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setLoading(true)
        try {
            const res = await sendMessageAction(receiverId, msg, MESSAGE_TYPES.TEXT)
            setMsg('')
        } catch (error: any) {
            console.log('Error in handleSendMsg (send-msg-input.tsx): ', error.message)
        } finally {
            setLoading(false)
        }
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { files } = e.target
        if (!files) return
        if (files.length > 0) {
            const file = files[0]
            const base64 = await readFileAsDataURL(file)
            console.log('base64: ', base64)

            try {
                setLoading(true)
                await sendMessageAction(receiverId, base64, MESSAGE_TYPES.IMAGE)
            } catch (error: any) {
                console.log('Error in handleFileChange (send-msg-input.tsx): ', error.message)
                throw error
            } finally {
                setLoading(false)
            }
        }

        e.target.value = ''
    }

    return (
        <div className="flex gap-2 items-center py-1">
            <div
                onClick={() => imgRef.current?.click()}
                className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center bg-sigBackgroundSecondaryHover transition-all hover:bg-[#3a3a3a] active:scale-95"
            >
                <Camera width={20} />

                <input
                    type="file"
                    accept="image/*"
                    hidden
                    ref={imgRef}
                    onChange={handleFileChange}
                />
            </div>
            <form
                onSubmit={handleSendMsg}
                className="flex-1 flex  items-center gap-1 bg-sigBackgroundSecondaryHover rounded-full border   border-sigColorBgBorder"
            >
                <Input
                    placeholder="Send a chat"
                    className="bg-transparent focus:outline-transparent border-none outline-none w-full h-full rounded-full"
                    type="text"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                />
                <Button
                    size={'sm'}
                    className="bg-transparent hover:bg-transparent text-sigSnapChat"
                    type="submit"
                >
                    {loading ? (
                        <Loader2 className="animate-spin w-6 h-6" />
                    ) : (
                        <TextMessageSent className=" scale-150 mr-1" />
                    )}
                </Button>
            </form>
            <div className="cursor-pointer w-10 h-10 rounded-full flex items-center justify-center text-white bg-sigBackgroundSecondaryHover">
                <EmojiPopover />
            </div>
        </div>
    )
}
export default SendMsgInput
