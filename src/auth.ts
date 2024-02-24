import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { connectDB } from './config/connectDB'
import User from './models/user.model'
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
            if (account?.provider === 'github') {
                await connectDB()

                try {
                    const checkUser = await User.findOne({ email: user?.email })
                    console.log('saving...............')

                    if (!checkUser) {
                        const newUser = await User.create({
                            username: profile?.login,
                            fullname: profile?.name,
                            email: profile?.email,
                            avatar: profile?.avatar_url,
                        })

                        await newUser.save()
                    }
                    return true
                } catch (error) {
                    console.log('Error signin in auth.ts', error)
                    // return false
                }
            }
            return false
        },
    },
})
