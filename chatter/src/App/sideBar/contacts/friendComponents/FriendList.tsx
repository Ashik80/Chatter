import React, { useContext } from 'react'
import { IFriend } from '../../../../models/friend'
import { observer } from 'mobx-react-lite'
import './FriendList.css'
import ActionButton from '../../../actionForms/ActionButton'
import { RootStoreContext } from '../../../../stores/rootStore'
import ActionForm from '../../../actionForms/ActionForm'
import FriendsInfo from '../../../friends/FriendsInfo'
import SelectChannels from '../../../actionForms/channels/SelectChannels'
import FriendButtonSet from './FriendButtonSet'
import RequestButtonSet from './RequestButtonSet'

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
        openModal(<ActionForm
            header='Are you sure you want to unfriend this user?'
            content={<FriendsInfo friend={friend} />}
            clickHandle={() => unfriend(friend.id).then(() => closeModal())}
            buttonText='Unfriend'
        />)
    }

    const addToChannelHandler = (id: string) => {
        openModal(<ActionForm
            header='Add user to channel'
            content={<SelectChannels userId={id} />}
            hideButton={true}
        />)
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