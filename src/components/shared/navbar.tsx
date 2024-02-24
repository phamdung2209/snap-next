import React from 'react'
import Link from 'next/link'
import { Button } from '~/components/ui/button'
import { Logo } from '~/assets/icons'
import BtnLogout from './logout-button'

const Navbar = async () => {
    return (
        <header className="w-full py-4 px-8 flex justify-between items-center">
            <Link href="/">
                <Logo className="cursor-pointer" width={40} height={40} />
            </Link>
            <div className="flex space-x-1">
                <Button className="bg-transparent hover:bg-primary/5 text-black">Stories</Button>
                <Button className="bg-transparent hover:bg-primary/5 text-black">Spotlight</Button>
                <Button asChild className="bg-transparent hover:bg-primary/5 text-black">
                    <Link href={'/chat'}> Chat</Link>
                </Button>
            </div>
            <div className="flex space-x-2">
                <Button className="bg-black text-white rounded-full p-3 text-xs md:text-sm">
                    Watch tutorial
                </Button>

                <Button asChild className="bg-black text-white rounded-full p-3 text-xs md:text-sm">
                    <Link href={'/login'}>Login</Link>
                </Button>

                <BtnLogout />
            </div>
        </header>
    )
}
export default Navbar
