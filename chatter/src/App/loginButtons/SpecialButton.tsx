import React from 'react'
import './SpecialButton.css'

interface IProps {
    disabled?: boolean
}

const SpecialButton: React.FC<IProps> = ({disabled}) => {
    return (
        <button 
            className='special-button' 
            style={{backgroundColor: disabled ? '#778196' : '#282c34'}}
            disabled={disabled}
        >
            <i className='fas fa-arrow-right' />
        </button>
    )
}

export default SpecialButton
