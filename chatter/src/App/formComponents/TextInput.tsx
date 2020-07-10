import React from 'react'
import {FieldRenderProps} from 'react-final-form'
import './TextInput.css'

interface IProps extends FieldRenderProps<string>{}

const TextInput: React.FC<IProps> = ({input, placeholder, meta: {touched, error}}) => {
    return (
        <div className='field'>
            <input {...input} placeholder={placeholder} className='text-input' />
            {touched && error && <div>{error}</div>}
        </div>
    )
}

export default TextInput
