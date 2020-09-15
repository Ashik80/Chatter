import React from 'react'

interface IProps {
    visibilityHandler: () => void,
    active: boolean,
    inputModeHandler: () => void,
    inputMode: boolean,
    header: string
}

const ContactHeader: React.FC<IProps> = ({
    visibilityHandler,
    active,
    inputModeHandler,
    inputMode,
    header
}) => {
    return (
        <div className='contact-header'>
            <div onClick={visibilityHandler}>
                <i className={`fas fa-chevron-right ${active && 'active-icon'}`} />
                {header}
            </div>
            <button className='add-contact-btn' onClick={inputModeHandler}>
                <i className={`fas fa-plus ${inputMode && 'cancel-btn'}`} />
            </button>
        </div>
    )
}

export default ContactHeader
