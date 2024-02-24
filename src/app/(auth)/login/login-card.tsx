import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Github } from '~/assets/icons'
import { Button } from '~/components/ui/button'
import { authAction } from '~/lib/actions'

const LoginCard = () => {
    return (
        <>
            <form action={authAction} className="space-y-4">
                <LoginButton />
            </form>
            <div className="mt-4 text-center text-[13px]">
                <span>New To SnapNext? </span>
                <Link className="text-blue-500 hover:underline text-[13px] mr-1" href="/signup">
                    Sign Up
                </Link>
            </div>
        </>
    )
}

function LoginButton() {
    return (
        <Button className="w-full flex gap-2">
            <Github width={20} height={20} /> Log in with Github
        </Button>
    )
}

export default LoginCard
