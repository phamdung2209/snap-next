import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// In summary, this function allows you to easily convert file contents to be displayed as an image.
export const readFileAsDataURL = (file: File | Blob): Promise<string> => {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            if (typeof reader.result === 'string') resolve(reader.result)
        }
        reader.readAsDataURL(file)
    })
}
// => "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABjElEQVRIDbXBAQEAAAABIP6Pv7..."

export const previewImg = (file: File | Blob): string => {
    return URL.createObjectURL(file)
}

export const formatDate = (inputDate: Date): string => {
    const date = new Date(inputDate)
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
    const formattedDate: string = date.toLocaleDateString('en-US', options)
    return formattedDate
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// MESSAGE TYPES
interface MessageType {
    TEXT: 'text'
    IMAGE: 'image'
    VIDEO: 'video'
    AUDIO: 'audio'
    FILE: 'file'
}

export const MESSAGE_TYPES: MessageType = {
    TEXT: 'text',
    IMAGE: 'image',
    VIDEO: 'video',
    AUDIO: 'audio',
    FILE: 'file',
}

// EMOJIS
export const EMOJIS = [
    { src: '/emojis/like.gif', alt: 'Like' },
    { src: '/emojis/dislike.gif', alt: 'Dislike' },
    { src: '/emojis/mind-blown.gif', alt: 'Mind Blown' },
    { src: '/emojis/laugh.gif', alt: 'Laugh' },
    { src: '/emojis/fire.gif', alt: 'Fire' },
    { src: '/emojis/question.gif', alt: 'Question' },
    { src: '/emojis/love.gif', alt: 'Love' },
]
