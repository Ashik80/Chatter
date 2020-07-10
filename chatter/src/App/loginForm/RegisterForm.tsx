import React from 'react'
import { Form, Field } from 'react-final-form'
import TextInput from '../formComponents/TextInput'
import Button from '../button/Button'
import './LoginForm.css'

const RegisterForm = () => {
    return (
        <div>
            <Form
                onSubmit={(values) => console.log(values)}
                render={({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
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
                        <Button content='Sign up' fluid paddingY={10} />
                    </form>
                )}
            />
        </div>
    )
}

export default RegisterForm