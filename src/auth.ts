import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async signIn({ user, account, profile }) {
            console.log('user', user)
            console.log('account', account)
            console.log('profile', profile)

            if (account?.provider === 'github') {
                try {
                    console.log('github account', account)
                    return true
                } catch (error) {
                    console.log('Error signin in auth.ts', error)
                    return false
                }
            }
            return false
        },
    },
})
