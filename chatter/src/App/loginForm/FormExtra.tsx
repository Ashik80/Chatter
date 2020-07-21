import React from 'react'

const FormExtra = (props: any) => {
    return (
        <div className='login-extra'>
            <small>
                {props.info}
            </small>
            <br />
            <small
                className='login-extra-action'
                onClick={props.onClick}
            >
                {props.action}
            </small>
        </div>
    )
}

export default FormExtra
