import React, { useState } from 'react'
import './Button.css'

interface IProps {
    content: string,
    paddingX?: number,
    paddingY?: number,
    inverted?: boolean,
    fluid?: boolean,
    fontSize?: number,
    onClick?: (any: any) => void
}

const Button: React.FC<IProps> = ({ content, paddingX, paddingY, inverted, fluid, fontSize }) => {
    const [active, setActive] = useState(false)

    const hoverHandler = () => {
        setActive(true)
    }

    const hoverOutHandler = () => {
        setActive(false)
    }

    const btnStyle = {
        padding: `${paddingY || 0}px ${paddingX || 0}px`,
        backgroundColor: '#282c34',
        color: 'white',
        border: 'none',
        transition: 'background-color 300ms',
        width: `${fluid && '100%'}`,
        fontSize: fontSize || '15px'
    }

    const btnOnHover = {
        padding: `${paddingY || 0}px ${paddingX || 0}px`,
        backgroundColor: '#17191e',
        color: 'white',
        border: 'none',
        transition: 'background-color 300ms',
        width: `${fluid && '100%'}`,
        fontSize: fontSize || '15px'
    }

    const invertedBtnStyle = {
        padding: `${paddingY!-1 || 0}px ${paddingX!-1 || 0}px`,
        backgroundColor: 'white',
        color: '#282c34',
        border: '1px solid #282c34',
        width: `${fluid && '100%'}`,
        fontSize: fontSize || '15px'
    }

    const invertedBtnOnHover = {
        padding: `${paddingY!-2 || 0}px ${paddingX!-2 || 0}px`,
        backgroundColor: 'white',
        color: '#282c34',
        border: '2px solid #282c34',
        width: `${fluid && '100%'}`,
        fontSize: fontSize || '15px'
    }

    if (inverted) return (
        <button
            className='styled-button'
            style={active ? invertedBtnOnHover : invertedBtnStyle}
            onMouseOver={hoverHandler}
            onMouseOut={hoverOutHandler}
        >
            {content}
        </button>
    )

    return (
        <button
            className='styled-button'
            style={active ? btnOnHover : btnStyle}
            onMouseOver={hoverHandler}
            onMouseOut={hoverOutHandler}
        >
            {content}
        </button>
    )
}

export default Button
