import NextAuth, { Session } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export default NextAuth({
    pages: {
        signIn: '/login',
    },
    providers: [],
    callbacks: {
        async authorized({ auth, request }: { auth: Session | null; request: NextRequest }) {
            const user = auth?.user

            const isChatPage = request.nextUrl.pathname.startsWith('/chat')
            const isAUthPage =
                request.nextUrl.pathname.startsWith('/login') ||
                request.nextUrl.pathname.startsWith('/signup')

            if (!user && isChatPage) {
                return false
            }

            if (user && isAUthPage) {
                return Response.redirect(new URL('/chat', request.nextUrl))
            }

            return true
        },
    },
    session: {
        maxAge: 30 * 24 * 60 * 60,
    },
}).auth

// We add a little extra rule (config) saying that the authentication should apply to most paths, but not to paths that include "api," "_next/static," "_next/image," or have a file extension of ".png."
export const config = {
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
