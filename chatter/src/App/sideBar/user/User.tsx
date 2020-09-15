import React, { useContext, useEffect } from 'react'
import './User.css'
import { observer } from 'mobx-react-lite'
import DropdownMenu from './DropdownMenu'
import { RootStoreContext } from '../../../stores/rootStore'
import FriendsInfo from '../../friends/FriendsInfo'

interface IProps {
    clickHandle: () => void,
    dropdown: boolean
}

const User: React.FC<IProps> = ({clickHandle, dropdown}) => {
    const rootStore = useContext(RootStoreContext)
    const { user, logout } = rootStore.userStore
    const {requests, listRequests} = rootStore.friendStore

    useEffect(() => {
        listRequests('received')
    }, [listRequests])

    return (
        <div className='user-wrap'>
            <div className='user'>
                <FriendsInfo friend={user} style={{borderRadius: '50%', backgroundColor: 'white'}} />
                <div className='user-status' />
            </div>
            <div className='dropdown' onClick={e => e.stopPropagation()}>
                {requests !== null && requests.receivedRequests !== null &&
                    requests.receivedRequests.length > 0 && 
                    <div className='notification' />}
                <button className='logout-btn' onClick={clickHandle}>
                    <i className='fas fa-sort-down' />
                </button>
                {dropdown && <DropdownMenu requests={requests} logout={logout} clickHandle={clickHandle} />}
            </div>
        </div>
    )
}

export default observer(User)
