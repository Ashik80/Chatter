import React from 'react'
import './ActionSubmit.css'

const ActionSubmit = (props: any) => {
    return (
        <button className='action-submit' onClick={props.clickHandle}>
            {props.buttonText}
        </button>
    )
}

export default ActionSubmit
