import Image from 'next/image'
import { signIn } from '~/auth'

export default function Home() {
    const authAction = async () => {
        'use server'
        await signIn('github')
    }
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <form action={authAction}>
                <button className="bg-black text-white p-4 rounded-md">Log in with GitHub</button>
            </form>
        </main>
    )
}
