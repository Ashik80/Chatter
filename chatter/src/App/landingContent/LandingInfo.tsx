import React, { useContext } from 'react'
import './LandingInfo.css'
import Button from '../button/Button'
import {observer} from 'mobx-react-lite'
import RegisterForm from '../loginForm/RegisterForm'
import { RootStoreContext } from '../../stores/rootStore'

const LandingInfo = () => {
    const rootStore = useContext(RootStoreContext)
    const {openModal} = rootStore.modalStore

    const clickHandle = () => {
        openModal(<RegisterForm />)
    }

    return (
        <div className='landing-info'>
            <div className='landing-header'>Chatter is where you get productive</div>
            <div className='landing-description'>Blazing fast, secure and easy to use</div>
            <div className='button-group'>
                <Button content='TRY IT' paddingX={50} paddingY={20} onClick={clickHandle} />
                <Button content='Why chatter?' paddingX={50} paddingY={20} inverted />
            </div>
        </div>
    )
}

export default observer(LandingInfo)
