import React, { useContext } from 'react'
import { IFriend } from '../../../../models/friend'
import { observer } from 'mobx-react-lite'
import './FriendList.css'
import { RootStoreContext } from '../../../../stores/rootStore'
import FriendsInfo from '../../../friends/FriendsInfo'
import FriendButtonSet from './FriendButtonSet'
import RequestButtonSet from './RequestButtonSet'
import { unfriendHandle, addToChannelHandle } from './friendHandlers'

interface IProps {
    friends: IFriend[] | undefined,
    accept?: (friend: IFriend) => Promise<void>,
    deleted?: (id: string, predicate: string) => Promise<void>,
    predicate?: string,
    request?: boolean
}

const FriendList: React.FC<IProps> = ({ friends, accept, deleted,
    predicate, request }) => {
    const rootStore = useContext(RootStoreContext)
    const { openModal, closeModal } = rootStore.modalStore
    const { unfriend } = rootStore.friendStore
    const { selected, setSelected } = rootStore.selectionStore

    const unfriendHandler = (friend: IFriend) => {
        unfriendHandle(friend, openModal, unfriend, closeModal)
    }

    const addToChannelHandler = (id: string) => {
        addToChannelHandle(id, openModal)
    }

    return (
        <div className='friend-list'>
            {friends?.map(friend =>
                <div key={friend.id} id={friend.id}
                    className={`friend-list-item ${selected === friend.id && 'selected-user'}`}
                    onClick={() => {
                        !request && setSelected(friend.id)
                    }}>
                    <FriendsInfo friend={friend} />
                    {request ?
                        (
                            <RequestButtonSet predicate={predicate}
                                acceptHandle={() => accept!(friend)}
                                deleteHandle={(e: any) => {
                                    e.stopPropagation()
                                    deleted!(friend.id, predicate!)
                                }}
                            />
                        ) : (
                            <FriendButtonSet
                                addToChannelHandle={(e: any) => {
                                    e.stopPropagation()
                                    addToChannelHandler(friend.id)
                                }}
                                unfriendHandle={() => unfriendHandler(friend)}
                            />
                        )
                    }
                </div>
            )}
        </div>
    )
}

export default observer(FriendList)