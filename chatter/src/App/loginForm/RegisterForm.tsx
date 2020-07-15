import React, { useContext } from 'react'
import { Form, Field } from 'react-final-form'
import TextInput from '../formComponents/TextInput'
import './LoginForm.css'
import SpecialButton from '../loginButtons/SpecialButton'
import ModalStore from '../../stores/modalStore'
import LoginForm from './LoginForm'
import UserStore from '../../stores/userStore'
import { IRegisterFormValues } from '../../models/user'

const RegisterForm = () => {
    const userStore = useContext(UserStore)
    const modalStore = useContext(ModalStore)
    const {openModal, closeModal} = modalStore
    const {register} = userStore

    return (
        <div>
            <Form
                onSubmit={(values: IRegisterFormValues) => register(values).then(() => closeModal())}
                render={({handleSubmit, submitting}) => (
                    <form onSubmit={handleSubmit} className='login-form'>
                        <div className='login-header'>Sign up on Chatter</div>
                        <Field name='displayName' placeholder='Display Name' component={TextInput} />
                        <Field name='userName' placeholder='User Name' component={TextInput} />
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
                                Already have an account?
                            </small>
                            <br />
                            <small 
                                className='login-extra-action'
                                onClick={() => openModal(<LoginForm />)}
                            >
                                Login
                            </small>
                        </div>
                    </form>
                )}
            />
        </div>
    )
}

export default RegisterForm