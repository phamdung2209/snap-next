import { Logo } from '~/assets/icons'
import { Avatar, AvatarImage } from '../ui/avatar'
import { IUserDocument } from '~/models/user.model'

const ChatUserInfo = ({ userData }: { userData: IUserDocument }) => {
    const { fullname: userFullName, avatar: userAvatar } = userData

    return (
        <div className="cursor-pointer bg-sigButtonSecondary hover:bg-sigButtonSecondaryHover rounded-full flex gap-2 items-center py-1 px-3 text-white font-semibold">
            <Avatar className="h-8 w-8 rounded-full flex items-center justify-center">
                {userAvatar ? <AvatarImage src={userAvatar} /> : <Logo />}
            </Avatar>

            <span>{userFullName}</span>
        </div>
    )
}
export default ChatUserInfo
