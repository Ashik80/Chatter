import React, { useContext } from 'react'
import { Form, Field } from 'react-final-form'
import TextInput from '../formComponents/TextInput'
import './LoginForm.css'
import SpecialButton from '../loginButtons/SpecialButton'
import ModalStore from '../../stores/modalStore'
import UserStore from '../../stores/userStore'
import RegisterForm from './RegisterForm'
import { ILoginFromValues } from '../../models/user'

const LoginForm = () => {
    const userStore = useContext(UserStore)
    const modalStore = useContext(ModalStore)
    const {openModal, closeModal} = modalStore
    const {login} = userStore

    return (
        <div>
            <Form
                onSubmit={(values: ILoginFromValues) => login(values).then(() => closeModal())}
                render={({ handleSubmit, submitting }) => (
                    <form onSubmit={handleSubmit} className='login-form'>
                        <div className='login-header'>Sign in to Chatter</div>
                        <Field name='email' component={TextInput} placeholder='Email' />
                        <Field
                            name='password'
                            type='password'
                            component={TextInput}
                            placeholder='Password'
                        />
                        <br />
                        <SpecialButton disabled={submitting} />
                        <div className='login-extra'>
                            <small>
                                Don't have an account?
                            </small>
                            <br />
                            <small
                                className='login-extra-action'
                                onClick={() => openModal(<RegisterForm />)}    
                            >
                                Create one
                            </small>
                        </div>
                    </form>
                )}
            />
        </div>
    )
}

export default LoginForm