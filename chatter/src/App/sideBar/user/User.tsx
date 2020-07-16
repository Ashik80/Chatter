import React, { useContext } from 'react'
import './User.css'
import { observer } from 'mobx-react-lite'
import DropdownMenu from './DropdownMenu'
import { RootStoreContext } from '../../../stores/rootStore'

interface IProps {
    clickHandle: () => void,
    dropdown: boolean
}

const User: React.FC<IProps> = ({clickHandle, dropdown}) => {
    const rootStore = useContext(RootStoreContext)
    const { user, logout } = rootStore.userStore

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
                {dropdown && <DropdownMenu logout={logout} clickHandle={clickHandle} />}
            </div>
        </div>
    )
}

export default observer(User)
