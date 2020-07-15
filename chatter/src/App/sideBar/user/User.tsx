import React, { useContext } from 'react'
import './User.css'
import UserStore from '../../../stores/userStore'
import { observer } from 'mobx-react-lite'
import DropdownMenu from './DropdownMenu'

interface IProps {
    clickHandle: () => void,
    dropdown: boolean
}

const User: React.FC<IProps> = ({clickHandle, dropdown}) => {
    const userStore = useContext(UserStore)
    const { user, logout } = userStore


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
            <div className='dropdown' onClick={e => e.stopPropagation()}>
                <button className='logout-btn' onClick={clickHandle}>
                    <i className='fas fa-sort-down' />
                </button>
                {dropdown && <DropdownMenu logout={logout} />}
            </div>
        </div>
    )
}

export default observer(User)
