import React from 'react'
import { LogOut } from 'lucide-react'
import { signOut } from '~/auth'

import { Button } from '../ui/button'

const BtnLogout = () => {
    async function logoutAction() {
        'use server'
        await signOut()
    }

    return (
        <form action={logoutAction}>
            <Button className="bg-black text-white rounded-full p-3 text-xs md:text-sm">
                <LogOut className="cursor-pointer" />
            </Button>
        </form>
    )
}

export default BtnLogout
