import { NextResponse } from 'next/server'
import { auth } from '~/auth'
import User, { IUserDocument } from '~/models/user.model'

export const GET = async () => {
    try {
        const session = await auth()
        if (!session) return
        const users: IUserDocument[] = await User.find()

        return NextResponse.json(
            users.filter((user) => user._id.toString() !== session?.user?._id.toString()),
        )
    } catch (error) {
        console.log('Error in GET /api/chat/users', error)
        throw error
    }
}
