import React from 'react'
import './SideBar.css'
import User from './user/User'
import Contacts from './contacts/Contacts'

interface IProps {
    clickHandle: () => void,
    dropdown: boolean
}

const SideBar: React.FC<IProps> = ({clickHandle, dropdown}) => {
    return (
        <div className='side-bar'>
            <div className='user-container'>
                <User clickHandle={clickHandle} dropdown={dropdown} />
            </div>
            <div className='sidebar-contents'>
                <Contacts 
                    header='channels' 
                    placeholder='Enter channel name'
                    inputName='name'
                    channel
                />
                <Contacts 
                    header='friends'
                    placeholder='Enter user code'
                    inputName='code'
                />
            </div>
        </div>
    )
}

export default SideBar
