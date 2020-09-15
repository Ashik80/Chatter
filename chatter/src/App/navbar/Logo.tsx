import React from 'react'
import './Logo.css'
import { Link } from 'react-router-dom'

const Logo = () => {
    return (
        <Link to='/' style={{textDecoration: 'none'}}>
            <div className='logo'>
                Chatter.io
            </div>
        </Link>
    )
}

export default Logo