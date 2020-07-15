import React from 'react'
import './DropdownMenu.css'

interface IProps {
    logout: () => void
}

const DropdownMenu: React.FC<IProps> = ({ logout }) => {
    return (
        <div className='dropdown-wrap'>
            <div className='dropdown-pointer' />
            <div className='dropdown-menu'>
                <div className='dropdown-item' onClick={() => logout()}>Logout</div>
            </div>
        </div>
    )
}

export default DropdownMenu