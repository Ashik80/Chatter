import React from 'react'
import './NavBar.css'
import Button from '../button/Button'
import Logo from './Logo'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className='nav'>
            <div className='navbar'>
                <Logo />
                <div className='nav-list'>
                    <div className='nav-link'>Sign in</div>
                    <Link to='/get-started'>
                        <Button content='GET STARTED' paddingX={20} paddingY={10} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NavBar