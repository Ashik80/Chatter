import React from 'react'
import ActionButton from '../../../actionForms/ActionButton'

const RequestButtonSet = (props: any) => {
    return (
        <div>
            {props.predicate === 'received' &&
                <ActionButton
                    clickHandle={props.acceptHandle}
                    content={<i className='fas fa-check' />}
                    style={{ color: 'green' }}
                />}
            <ActionButton
                clickHandle={props.deleteHandle}
                style={{ marginLeft: 5, color: 'red' }}
                content={<i className='fas fa-times' />}
            />
        </div>
    )
}

export default RequestButtonSet
