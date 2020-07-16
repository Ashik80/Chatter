import React from 'react'
import { IFriend } from '../../../models/friend'
import { observer } from 'mobx-react-lite'
import './FriendList.css'

interface IProps {
    friends: IFriend[] | undefined,
    accept?: (friend: IFriend) => Promise<void>,
    deleted?: (id: string, predicate: string) => Promise<void>,
    predicate?: string,
    request?: boolean
}

const FriendList: React.FC<IProps> = ({ friends, accept, deleted, predicate, request }) => {
    return (
        <div className='friend-list'>
            {friends?.map(friend =>
                <div key={friend.id} className='friend-list-item'>
                    <div className='friend-info'>
                        <div className='friend-image' />
                        <div>
                            <div className='friend-name'>{friend.displayName}</div>
                            <div className='friend-code'>{friend.code}</div>
                        </div>
                    </div>
                    {request && <div className='friend-btn-group'>
                        <button>
                            <i 
                                className='fas fa-check accept-btn' 
                                onClick={() => accept!(friend)}
                            />
                        </button>
                        <button>
                            <i 
                                className='fas fa-times delete-btn' 
                                onClick={() => deleted!(friend.id, predicate!)} 
                            />
                        </button>
                    </div>}
                </div>
            )}
        </div>
    )
}

export default observer(FriendList)