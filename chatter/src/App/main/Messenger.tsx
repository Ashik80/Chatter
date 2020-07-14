import React, { useContext, useEffect } from 'react'
import SideBar from '../sideBar/SideBar'
import Content from '../content/Content'
import './Messenger.css'
import UserStore from '../../stores/userStore'
import { observer } from 'mobx-react-lite'

const Messenger = () => {
    const userStore = useContext(UserStore)
    const {currentUser, user} = userStore

    useEffect(() => {
        user == null && currentUser()
    }, [currentUser, user])

    return (
        <div className='messenger'>
            <SideBar />
            <Content />
        </div>
    )
}

export default observer(Messenger)
