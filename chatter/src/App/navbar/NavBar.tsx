import React, { useContext } from 'react'
import './NavBar.css'
import Button from '../button/Button'
import Logo from './Logo'
import { Link } from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import LoginForm from '../loginForm/LoginForm'
import { RootStoreContext } from '../../stores/rootStore'

const NavBar = () => {
    const rootStore = useContext(RootStoreContext)
    const {openModal} = rootStore.modalStore

    const clickHandle = () => {
        openModal(<LoginForm />)
    }

    return (
        <div className='nav'>
            <div className='navbar'>
                <Logo />
                <div className='nav-list'>
                    <div className='nav-link' onClick={clickHandle}>Sign in</div>
                    <Link to='/get-started'>
                        <Button content='GET STARTED' paddingX={20} paddingY={10} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default observer(NavBar)