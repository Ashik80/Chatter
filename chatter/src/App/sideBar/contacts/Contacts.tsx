import React, { useState } from 'react'
import './Contacts.css'

interface IProps {
    header: string,
    name: string
}

const Contacts: React.FC<IProps> = ({ header, name }) => {
    const [listVisibility, setListVisibility] = useState(false)
    const [active, setActive] = useState(false)

    const visibilityHandler = () => {
        setListVisibility(!listVisibility)
        setActive(!active)
    }

    return (
        <div className='contacts'>
            <div className='contact-header' onClick={visibilityHandler}>
                <i className={`fas fa-chevron-right ${active && 'active-icon'}`} />
                {header}
            </div>
            {listVisibility && <div className='contact-list'>
                <div className='contact-name'>{name}</div>
            </div>}
        </div>
    )
}

export default Contacts
