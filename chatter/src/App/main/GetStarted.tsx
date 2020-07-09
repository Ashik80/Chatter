import React from 'react'
import Logo from '../navbar/Logo'
import './GetStarted.css'
import SigningContent from '../signingContent/SigningContent'

const GetStarted = () => {
    return (
        <div className='get-started'>
            <Logo />
            <div className='signing-content-position'>
                <SigningContent
                    header='Try Chatter with your team'
                    description='Discover powerful, fast features and productive in the meantime.'
                    buttonText='Sign up on slack'
                />
                <SigningContent
                    header='Are you already using Chatter'
                    description='Sign in and continue shaping the path to your future'
                    inverted
                    buttonText='Sign in to continue'
                />
            </div>
        </div>
    )
}

export default GetStarted