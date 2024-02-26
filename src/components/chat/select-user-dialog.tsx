'use client'

import { Dialog, DialogContent, DialogFooter, DialogClose, DialogHeader } from '../ui/dialog'
import { Button } from '../ui/button'
import { TextMessageSent } from '~/assets/icons'
import { Loader2, SearchIcon } from 'lucide-react'
import UserCard from './user-card'
import { useEffect, useState } from 'react'
import { IUserDocument } from '~/models/user.model'
import { sendMessageAction } from '~/lib/actions'
import { MESSAGE_TYPES } from '~/lib/utils'
import { useRouter } from 'next/navigation'

type SelectUserDialogProps = {
    selectedFile: string
    onClose: () => void
    onPrev: () => void
}

const SelectUserDialog = ({ selectedFile, onClose, onPrev }: SelectUserDialogProps) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [users, setUsers] = useState<IUserDocument[]>([])
    const [isSending, setIsSending] = useState<boolean>(false)
    const [selectedUser, setSelectedUser] = useState<IUserDocument | null>(null)
    const router = useRouter()

    useEffect(() => {
        const getUsers = async () => {
            setLoading(true)
            try {
                const res = await fetch('/api/chat/users')
                const data = await res.json()

                setUsers(data)
            } catch (error) {
                console.log('Error in GET /api/chat/users', error)
                throw error
            } finally {
                setLoading(false)
            }
        }

        getUsers()
    }, [])

    const handleSelectedUser = (user: IUserDocument) => {
        setSelectedUser(user)
    }

    const handleSendMessage = async () => {
        setIsSending(true)
        try {
            await sendMessageAction(selectedUser?._id, selectedFile, MESSAGE_TYPES.IMAGE)
            router.push(`/chat/${selectedUser?._id}`)
        } catch (error: any) {
            console.log('Error in handleSendMessage (select-user-dialog.tsx)', error.message)
            throw error
        } finally {
            setIsSending(false)
        }
    }

    return (
        <Dialog open={!!selectedFile}>
            <DialogContent
                className="bg-sigMain border border-sigColorBgBorder text-white max-w-xs"
                onInteractOutside={onClose}
            >
                <DialogHeader>
                    <div className=" text-gray-400 p-1  flex gap-2 rounded-full bg-sigSurface border border-sigColorBgBorder">
                        <SearchIcon className="text-gray-400 w-5" />
                        <input
                            className="bg-transparent border-none text-sm text-white placeholder-gray-400 focus:outline-none w-full"
                            placeholder="To:"
                            type="text"
                        />
                    </div>
                    <p className="font-semibold py-2">Chats:</p>
                    <div className="flex flex-col max-h-48 bg-sigSurface rounded-md overflow-auto">
                        {users.map((user: IUserDocument) => (
                            <UserCard
                                key={user._id}
                                user={user}
                                selectedUser={selectedUser}
                                handleSelectedUser={handleSelectedUser}
                            />
                        ))}
                    </div>
                    {loading && (
                        <div className="flex items-center justify-center">
                            <Loader2 className="size-6 animate-spin" />
                        </div>
                    )}
                </DialogHeader>
                <DialogFooter className="mx-auto flex items-center">
                    <DialogClose asChild>
                        <Button
                            variant="destructive"
                            size={'sm'}
                            onClick={onClose}
                            className="rounded-full bg-sigSnapImg"
                        >
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button size={'sm'} onClick={onPrev} className="rounded-full px-4">
                        Prev
                    </Button>
                    <Button
                        size={'sm'}
                        className="rounded-full bg-sigSnapChat hover:bg-sigSnapChat gap-1"
                        onClick={handleSendMessage}
                        disabled={!selectedUser || isSending}
                    >
                        {isSending ? (
                            <Loader2 className="size-6 animate-spin" />
                        ) : (
                            <>
                                Send To <TextMessageSent className="text-white scale-95 my-auto" />
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SelectUserDialog
