import React, { SyntheticEvent } from 'react'
import './RequestNav.css'

interface IProps {
    tab: string,
    tabHandle: (e: SyntheticEvent<HTMLDivElement>) => void
}

const RequestNav: React.FC<IProps> = ({tab, tabHandle}) => {
    return (
        <div className='request-nav'>
            <div
                id='received'
                className={`request-nav-item ${tab === 'received' && 'active-nav-item'}`}
                onClick={tabHandle}
            >
                Received
            </div>
            <div
                id='sent'
                className={`request-nav-item ${tab === 'sent' && 'active-nav-item'}`}
                onClick={tabHandle}
            >
                Sent
            </div>
        </div>
    )
}

export default RequestNav
