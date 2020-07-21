import React from 'react'

const ResponseMessage = (props: any) => {
    const responseStyle = {
        padding: '5px 10px',
        color: props.error ? '#912D2B' : '#4B784A',
        backgroundColor: props.error ? '#FFF6F6' : '#E5F9E7',
        textAlign: 'center' as 'center',
        borderRadius: 5,
        marginTop: 5,
        border: `2px solid ${props.error ? '#912D2B' : '#4B784A'}`
    }

    return (
        <div className='response-message' style={responseStyle}>
            <div>{props.message}</div>
        </div>
    )
}

export default ResponseMessage