'use client'

import { Loader2, Trash } from 'lucide-react'
import { Button } from '../ui/button'
import { deleteChatAction } from '~/lib/actions'
import { useFormState, useFormStatus } from 'react-dom'
import { useParams } from 'next/navigation'

const DeleteMessagesButton = () => {
    const { id: userId } = useParams<{ id: string }>()
    const deleteChat = deleteChatAction.bind(null, userId)
    const [errMsg, dispatch] = useFormState(deleteChat, null)
    return (
        <form action={dispatch} className="flex flex-col">
            <DeleteButton />
            {errMsg ? <p className="text-red-500 text-xs">{errMsg}</p> : null}
        </form>
    )
}
export default DeleteMessagesButton

function DeleteButton() {
    const { pending } = useFormStatus()
    return (
        <Button className="bg-sigButtonSecondary  hover:bg-sigButtonSecondaryHover w-12 h-12 rounded-full ">
            {!pending ? <Trash /> : <Loader2 className="h-4 w-4 animate-spin" />}
        </Button>
    )
}
