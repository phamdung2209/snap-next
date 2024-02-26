import { IUserDocument } from '~/models/user.model'
import { Avatar, AvatarImage } from '../ui/avatar'

type UserCardProps = {
    user: IUserDocument
    handleSelectedUser: (user: IUserDocument) => void
    selectedUser: IUserDocument | null
}

const UserCard = ({ user, handleSelectedUser, selectedUser }: UserCardProps) => {
    const isSelected: boolean = selectedUser?._id === user._id
    return (
        <div
            onClick={() => handleSelectedUser(user)}
            className={`flex items-center gap-2 border-b border-b-sigColorBgBorder p-1 hover:bg-sigBackgroundFeedHover cursor-pointer ${
                isSelected && 'bg-sigBackgroundFeedHover'
            } `}
        >
            <Avatar className="cursor-pointer hover:bg-sigBackgroundSecondaryHover">
                <AvatarImage src={user.avatar} />
            </Avatar>
            <span>{user.fullname ?? user.username}</span>
        </div>
    )
}
export default UserCard
