import React from 'react'
import './Contacts.css'

interface IProps {
    header: string,
    name: string
}

const Contacts: React.FC<IProps> = ({ header, name }) => {
    return (
        <div className='contacts'>
            <div className='contact-header'>{header}</div>
            <div className='contact-list'>
                <div className='contact-name'>{name}</div>
            </div>
        </div>
    )
}

export default Contacts
