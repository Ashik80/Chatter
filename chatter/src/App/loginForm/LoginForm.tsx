import React, { useContext } from 'react'
import { Form, Field } from 'react-final-form'
import TextInput from '../formComponents/TextInput'
import './LoginForm.css'
import SpecialButton from '../loginButtons/SpecialButton'
import RegisterForm from './RegisterForm'
import { ILoginFromValues } from '../../models/user'
import { RootStoreContext } from '../../stores/rootStore'
import FormExtra from './FormExtra'
import { combineValidators, isRequired } from 'revalidate'
import { FORM_ERROR } from 'final-form'
import ErrorMessage from '../errors/ErrorMessage'

const validate = combineValidators({
    email: isRequired('Email'),
    password: isRequired('Password')
})

const LoginForm = () => {
    const rootStore = useContext(RootStoreContext)
    const { modalStore, userStore } = rootStore
    const { openModal } = modalStore
    const { login } = userStore

    return (
        <div>
            <Form
                validate={validate}
                onSubmit={(values: ILoginFromValues) => login(values).catch(error => ({
                    [FORM_ERROR]: error
                }))}
                render={({ handleSubmit, submitError, submitting, 
                    invalid, dirtySinceLastSubmit, pristine, form }) => (
                    <form onSubmit={handleSubmit} className='login-form'>
                        <div className='login-header'>Sign in to Chatter</div>
                        <Field name='email' component={TextInput} placeholder='Email' />
                        <Field
                            name='password'
                            type='password'
                            component={TextInput}
                            placeholder='Password'
                        />
                        {!dirtySinceLastSubmit && submitError && <ErrorMessage error={submitError} />}
                        <br />
                        <SpecialButton
                            disabled={((invalid && !dirtySinceLastSubmit) || pristine || submitting)} />
                        <FormExtra info="Don't have an account?" action='Create one'
                            onClick={() => openModal(<RegisterForm />)} />
                    </form>
                )}
            />
        </div>
    )
}

export default LoginForm