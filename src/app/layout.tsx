import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Share the moment | Snapchat',
    description:
        'Chat, send Snaps, explore Stories & Lenses on desktop, or download the app for mobile! Connect & create with friends, wherever you are.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/snapchat.png" />
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    )
}
