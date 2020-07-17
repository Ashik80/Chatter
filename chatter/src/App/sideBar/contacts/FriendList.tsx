import React, { useContext } from 'react'
import { IFriend } from '../../../models/friend'
import { observer } from 'mobx-react-lite'
import './FriendList.css'
import ActionButton from '../../actionForms/ActionButton'
import { RootStoreContext } from '../../../stores/rootStore'
import ActionForm from '../../actionForms/ActionForm'
import FriendsInfo from '../../friends/FriendsInfo'
import SelectChannels from '../../actionForms/channels/SelectChannels'

interface IProps {
    friends: IFriend[] | undefined,
    accept?: (friend: IFriend) => Promise<void>,
    deleted?: (id: string, predicate: string) => Promise<void>,
    predicate?: string,
    request?: boolean
}

const FriendList: React.FC<IProps> = ({ friends, accept, deleted, predicate, request }) => {
    const rootStore = useContext(RootStoreContext)
    const { openModal, closeModal } = rootStore.modalStore
    const { unfriend } = rootStore.friendStore

    const unfriendHandler = (friend: IFriend) => {
        openModal(<ActionForm
            header='Are you sure you want to unfriend this user?'
            content={<FriendsInfo friend={friend} />}
            clickHandle={() => unfriend(friend.id).then(() => closeModal())}
            buttonText='Unfriend'
        />)
    }

    const addToChannelHandler = (id: string) => {
        openModal(<SelectChannels userId={id} />)
    }

    return (
        <div className='friend-list'>
            {friends?.map(friend =>
                <div key={friend.id} className='friend-list-item'>
                    <FriendsInfo friend={friend} />
                    {request ? (
                        <div>
                            {predicate === 'received' &&
                                <ActionButton
                                    clickHandle={() => accept!(friend)}
                                    content={<i className='fas fa-check' />}
                                    style={{ color: 'green' }}
                                />}
                            <ActionButton
                                clickHandle={() => deleted!(friend.id, predicate!)}
                                style={{ marginLeft: 5, color: 'red' }}
                                content={<i className='fas fa-times' />}
                            />
                        </div>) :
                        (
                            <div>
                                <ActionButton
                                    clickHandle={() => addToChannelHandler(friend.id)}
                                    content={<i className='fas fa-plus' />}
                                    style={{ color: 'white' }}
                                />
                                <ActionButton
                                    clickHandle={() => unfriendHandler(friend)}
                                    content={<i className='fas fa-times' />}
                                    style={{ color: 'red' }}
                                />
                            </div>
                        )}
                </div>
            )}
        </div>
    )
}

export default observer(FriendList)