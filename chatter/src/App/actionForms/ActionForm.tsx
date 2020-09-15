import React from 'react'
import './ActionForm.css'
import ActionSubmit from './ActionSubmit'

const ActionForm = (props: any) => {
    return (
        <div className='action-form'>
            <div className='action-header'>{props.header}</div>
            <div className='action-content'>{props.content}</div>
            {!props.hideButton &&
            <ActionSubmit clickHandle={props.clickHandle} buttonText={props.buttonText} />}
        </div>
    )
}

export default ActionForm
