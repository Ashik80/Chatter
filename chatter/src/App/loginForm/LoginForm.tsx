import React, { useContext } from 'react'
import { Form, Field } from 'react-final-form'
import TextInput from '../formComponents/TextInput'
import './LoginForm.css'
import SpecialButton from '../loginButtons/SpecialButton'
import RegisterForm from './RegisterForm'
import { ILoginFromValues } from '../../models/user'
import { RootStoreContext } from '../../stores/rootStore'
import FormExtra from './FormExtra'

const LoginForm = () => {
    const rootStore = useContext(RootStoreContext)
    const {modalStore, userStore} = rootStore
    const {openModal, closeModal} = modalStore
    const {login} = userStore

    return (
        <div>
            <Form
                onSubmit={(values: ILoginFromValues) => login(values).then(() => closeModal())}
                render={({ handleSubmit, submitting, invalid, pristine, form }) => (
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
                        <SpecialButton disabled={(submitting || invalid || pristine)} />
                        <FormExtra info="Don't have an account?" action='Create one'
                            onClick={() => openModal(<RegisterForm />)}/>
                        <pre>{JSON.stringify(form.getState(), null, 2)}</pre>
                    </form>
                )}
            />
        </div>
    )
}

export default LoginForm