import { NextResponse } from 'next/server'
import { auth } from '~/auth'
import User, { IUserDocument } from '~/models/user.model'

export const GET = async () => {
    try {
        const session = await auth()
        if (!session) return
        const users: IUserDocument[] = await User.find()

        // Filter the authenticated user from the list
        // return NextResponse.json(
        //     users.filter((user) => user._id.toString() !== session?.user?._id.toString()),
        // )
        const filteredUsers = users.filter(
            (user) => user._id.toString() !== session.user._id.toString(),
        )
        return NextResponse.json(filteredUsers)
    } catch (error) {
        console.log('Error in GET /api/chat/users', error)
        throw error
    }
}
