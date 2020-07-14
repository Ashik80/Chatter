import React, { useContext } from 'react'
import './User.css'
import UserStore from '../../../stores/userStore'
import { observer } from 'mobx-react-lite'

const User = () => {
    const userStore = useContext(UserStore)
    const { user } = userStore

    return (
        <div className='user-wrap'>
            <div className='user'>
                <div className='user-img' />
                <div>
                    <div className='user-name'>
                        {user?.displayName}
                    </div>
                    <div className='user-code'>{user?.code}</div>
                </div>
                <div className='user-status' />
            </div>
            <button className='logout-btn'>
                <i className='fas fa-sort-down' />
            </button>
        </div>
    )
}

export default observer(User)
