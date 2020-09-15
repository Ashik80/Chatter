import React, { useContext } from 'react'
import Button from '../button/Button'
import './SigningContent.css'
import RegisterForm from '../loginForm/RegisterForm'
import LoginForm from '../loginForm/LoginForm'
import { RootStoreContext } from '../../stores/rootStore'

interface IProps {
    inverted?: boolean,
    header?: string,
    description?: string,
    buttonText: string,
    name?: string
}

const SigningContent: React.FC<IProps> = ({ 
    inverted,
    header,
    description,
    buttonText,
    name
}) => {
    const rootStore = useContext(RootStoreContext)
    const {openModal} = rootStore.modalStore

    const divStyle = {
        padding: `${inverted ? 49 : 50}px ${inverted ? 34 : 35}px`,
        backgroundColor: inverted ? 'white' : '#282c34',
        color: inverted ? '#282c34' : 'white',
        width: '30vw',
        textAlign: 'left' as 'left',
        boxSizing: 'border-box' as 'border-box',
        border: inverted ? '1px solid #ccc' : 'none'
    }

    const handleModal = () => {
        if(name === 'signup'){
            openModal(<RegisterForm />)
        } else if (name === 'signin') {
            openModal(<LoginForm />)
        }
    }

    return (
        <div className='signing-content' style={divStyle}>
            <div className='signing-content-header'>{header}</div>
            <div className='signing-content-description'>
                {description}
            </div>
            <Button
                name={name}
                content={buttonText}
                fluid
                paddingY={10}
                paddingX={20}
                inverted
                fontSize={18}
                onClick={handleModal}
            />
        </div>
    )
}

export default SigningContent