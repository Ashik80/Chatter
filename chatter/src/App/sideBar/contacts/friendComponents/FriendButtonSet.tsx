import React from 'react'
import ActionButton from '../../../actionForms/ActionButton'

const FriendButtonSet = (props: any) => {
    return (
        <div>
            <ActionButton
                clickHandle={props.addToChannelHandle}
                content={<i className='fas fa-plus' />}
                style={{ color: 'white' }}
            />
            <ActionButton
                clickHandle={props.unfriendHandle}
                content={<i className='fas fa-times' />}
                style={{ color: 'red' }}
            />
        </div>
    )
}

export default FriendButtonSet
