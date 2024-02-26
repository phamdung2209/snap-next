'use client'

import Link from 'next/link'
import React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { Github } from '~/assets/icons'
import { Button } from '~/components/ui/button'
import { authAction } from '~/lib/actions'

const LoginCard = () => {
    const [errMessage, dispatch] = useFormState(authAction, '')

    return (
        <>
            <form action={dispatch} className="space-y-4">
                <LoginButton />
            </form>
            <div className="mt-4 text-center text-[13px]">
                <span>New To SnapNext? </span>
                <Link className="text-blue-500 hover:underline text-[13px] mr-1" href="/signup">
                    Sign Up
                </Link>

                {errMessage && <p className="text-red-500 text-sm">{errMessage}</p>}
            </div>
        </>
    )
}

function LoginButton() {
    const { pending } = useFormStatus()
    return (
        <Button className="w-full flex gap-2" disabled={pending} aria-disabled={pending}>
            <Github width={20} height={20} /> Log in with Github
        </Button>
    )
}

export default LoginCard
