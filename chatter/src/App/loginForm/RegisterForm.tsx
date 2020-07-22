import React, { useContext } from 'react'
import { Form, Field } from 'react-final-form'
import TextInput from '../formComponents/TextInput'
import './LoginForm.css'
import SpecialButton from '../loginButtons/SpecialButton'
import LoginForm from './LoginForm'
import { IRegisterFormValues } from '../../models/user'
import { RootStoreContext } from '../../stores/rootStore'
import FormExtra from './FormExtra'
import { FORM_ERROR } from 'final-form'
import ErrorMessage from '../errors/ErrorMessage'
import { combineValidators, isRequired } from 'revalidate'

const validate = combineValidators({
    displayName: isRequired('Display name'),
    userName: isRequired('Username'),
    email: isRequired('Email'),
    password: isRequired('Password')
})

const RegisterForm = () => {
    const rootStore = useContext(RootStoreContext)
    const {openModal} = rootStore.modalStore
    const {register} = rootStore.userStore

    return (
        <div>
            <Form
                validate={validate}
                onSubmit={(values: IRegisterFormValues) => register(values).catch(error => ({
                    [FORM_ERROR]: error
                }))}
                render={({handleSubmit, submitting, form, dirtySinceLastSubmit, 
                    submitError, pristine, invalid}) => (
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
                        {submitError && !dirtySinceLastSubmit && <ErrorMessage error={submitError} />}
                        <br />
                        <SpecialButton 
                            disabled={(invalid && !dirtySinceLastSubmit) || pristine || submitting} />
                        <FormExtra info='Already have an account?' action='Login'
                            onClick={() => openModal(<LoginForm />)} />
                    </form>
                )}
            />
        </div>
    )
}

export default RegisterForm