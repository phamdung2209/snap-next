'use client'

import { Loader2, SmilePlus } from 'lucide-react'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { EMOJIS, MESSAGE_TYPES, readFileAsDataURL } from '~/lib/utils'
import { sendMessageAction } from '~/lib/actions'
import { useParams } from 'next/navigation'

export function EmojiPopover() {
    const popoverRef = useRef<HTMLButtonElement>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const { id: receiverId } = useParams<{ id: string }>()

    const handleSendMsg = async (imgUrl: string) => {
        setLoading(true)
        try {
            const isEmojis = EMOJIS.some((emoji) => emoji.src === imgUrl)
            if (isEmojis) {
                await sendMessageAction(receiverId, imgUrl, MESSAGE_TYPES.IMAGE)
            } else {
                const blog = await fetch(imgUrl).then((r) => r.blob())
                const dataUrl = await readFileAsDataURL(blog)
                await sendMessageAction(receiverId, dataUrl, MESSAGE_TYPES.IMAGE)
            }
        } catch (error: any) {
            console.log('Error in handleSendMsg (emoji-popover.tsx): ', error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild ref={popoverRef}>
                <Button
                    ref={popoverRef}
                    className="bg-transparent hover:bg-transparent max-w-min rounded-full h-11 w-11 transition-all active:scale-105"
                    disabled={loading}
                >
                    {loading ? (
                        <Loader2 className="animate-spin w-6 h-6" />
                    ) : (
                        <SmilePlus className="scale-150" />
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-sigMain border border-sigColorBgBorder">
                <div className="flex gap-4 flex-wrap items-center">
                    {EMOJIS.map((emoji) => (
                        <Emoji
                            key={emoji.src}
                            {...emoji}
                            onClick={() => handleSendMsg(emoji.src)}
                        />
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    )
}

const Emoji = ({ src, alt, onClick }: { src: string; alt: string; onClick: () => void }) => (
    <div className="cursor-pointer hover:scale-110 transition-all" onClick={onClick}>
        <Image src={src} width={70} height={70} alt={alt} />
    </div>
)
