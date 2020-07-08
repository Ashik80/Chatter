import React from 'react'
import './SideBar.css'
import User from './user/User'
import Contacts from './contacts/Contacts'

const SideBar = () => {
    return (
        <div className='side-bar'>
            <div className='user-container'>
                <User />
            </div>
            <div className='sidebar-contents'>
                <Contacts header='CHANNELS' name='#general' />
                <Contacts header='FRIENDS' name='Friend name' />
            </div>
        </div>
    )
}

export default SideBar
