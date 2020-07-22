import { IFriend } from "../../../../models/friend"
import ActionForm from "../../../actionForms/ActionForm"
import React from "react"
import FriendsInfo from "../../../friends/FriendsInfo"
import SelectChannels from "../../../actionForms/channels/SelectChannels"

export const unfriendHandle = (
    friend: IFriend,
    openModal: (body: JSX.Element) => void,
    unfriend: (id: string) => Promise<void>,
    closeModal: () => void
) => {
    openModal(<ActionForm
        header='Are you sure you want to unfriend this user?'
        content={<FriendsInfo friend={friend} />}
        clickHandle={() => unfriend(friend.id).then(() => closeModal())}
        buttonText='Unfriend'
    />)
}

export const addToChannelHandle = (
    id: string,
    openModal: (body: JSX.Element) => void
) => {
    openModal(<ActionForm
        header='Add user to channel'
        content={<SelectChannels userId={id} />}
        hideButton={true}
    />)
}