import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import { connectDB } from './config/connectDB.config'
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
        async session({ session }) {
            try {
                await connectDB()
                if (session?.user) {
                    const user = await User.findOne({
                        $or: [{ email: session?.user?.email }, { username: session?.user?.name }],
                    })

                    if (!user) {
                        throw new Error('User not found')
                    } else {
                        session.user = {
                            ...session.user,
                            _id: user._id,
                        }
                        return session
                    }
                } else {
                    throw new Error('Invalid session')
                }
            } catch (error) {
                throw new Error('Invalid session')
            }
        },
    },
    trustHost: true,
})
