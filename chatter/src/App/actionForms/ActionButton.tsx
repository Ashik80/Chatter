import React from 'react'
import './ActionButton.css'

const ActionButton = (props: any) => {
    return (
        <button
            className='action-btn'
            style={props.style}
            onClick={props.clickHandle}
        >
            {props.content}
        </button>
    )
}

export default ActionButton