import React, { useState, SyntheticEvent } from 'react'
import SideBar from '../sideBar/SideBar'
import Content from '../content/Content'
import './Messenger.css'
import { observer } from 'mobx-react-lite'

const Messenger = () => {
    const [dropdown, setDropdown] = useState(false)

    const clickHandle = () => {
        setDropdown(!dropdown)
    }

    const anywhereHandle = (e: SyntheticEvent<HTMLDivElement>) => {
        if(e.currentTarget.id === 'messenger'){
            setDropdown(false)
        }
    }

    return (
        <div id='messenger' className='messenger' onClick={anywhereHandle}>
            <SideBar clickHandle={clickHandle} dropdown={dropdown} />
            <Content />
        </div>
    )
}

export default observer(Messenger)
