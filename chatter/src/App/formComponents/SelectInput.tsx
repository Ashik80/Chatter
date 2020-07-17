import React from 'react'
import { FieldRenderProps } from 'react-final-form'

interface IProps extends FieldRenderProps<string> {
    options: any[]
}

const SelectInput: React.FC<IProps> = ({input, options, meta: {touched, error}}) => {
    return (
        <div className='field'>
            <select onChange={(value) => input.onChange(value)}>
                {options.map((x: any) => 
                    <option key={x.id} value={x.id}>{x.name}</option>    
                )}
            </select>
            {touched && error && <div>{error}</div>}
        </div>
    )
}

export default SelectInput