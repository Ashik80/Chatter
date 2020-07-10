import React from 'react'
import { Form, Field } from 'react-final-form'
import TextInput from '../formComponents/TextInput'
import Button from '../button/Button'
import './LoginForm.css'

const LoginForm = () => {
    return (
        <div>
            <Form
                onSubmit={(values) => console.log(values)}
                render={({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <div className='login-header'>Sign in to Chatter</div>
                        <Field name='email' component={TextInput} placeholder='Email' />
                        <Field
                            name='password'
                            type='password'
                            component={TextInput}
                            placeholder='Password'
                        />
                        <Button content='Sign in' fluid paddingY={10} />
                    </form>
                )}
            />
        </div>
    )
}

export default LoginForm