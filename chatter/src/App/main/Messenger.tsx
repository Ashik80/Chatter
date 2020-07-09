import React from 'react'
import SideBar from '../sideBar/SideBar'
import Content from '../content/Content'
import './Messenger.css'

const Messenger = () => {
    return (
        <div className='messenger'>
            <SideBar />
            <Content />
        </div>
    )
}

export default Messenger
