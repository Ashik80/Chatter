import React, { useState, SyntheticEvent, useEffect, useContext } from 'react'
import SideBar from '../sideBar/SideBar'
import Content from '../content/Content'
import './Messenger.css'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../stores/rootStore'

const Messenger = () => {
    const rootStore = useContext(RootStoreContext)
    const {currentUser} = rootStore.userStore

    const [dropdown, setDropdown] = useState(false)

    const clickHandle = () => {
        setDropdown(!dropdown)
    }

    const anywhereHandle = (e: SyntheticEvent<HTMLDivElement>) => {
        if(e.currentTarget.id === 'messenger'){
            setDropdown(false)
        }
    }

    useEffect(() => {
        currentUser()
    }, [currentUser])

    return (
        <div id='messenger' className='messenger' onClick={anywhereHandle}>
            <SideBar clickHandle={clickHandle} dropdown={dropdown} />
            <Content />
        </div>
    )
}

export default observer(Messenger)
