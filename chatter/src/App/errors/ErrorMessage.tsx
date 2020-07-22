import React from 'react'
import './ErrorMessage.css'

const ErrorMessage = (props: any) => {
    return (
        <div className='error-message'>
            <div className='error-header'>{props.error.statusText}</div>
            {props.error.data && Object.keys(props.error.data.errors).length > 0 &&
                <ul className='error-list'>
                    {Object.values(props.error.data.errors).flat().map((error: any, index) =>
                        <li key={index}>{error}</li>
                    )}
                </ul>
            }
        </div>
    )
}

export default ErrorMessage
