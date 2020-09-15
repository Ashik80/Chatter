import React from 'react'
import './FriendsInfo.css'

const FriendsInfo = (props: any) => {
    return (
        <div className='friend-info'>
            <div className='friend-image' style={props.style} />
            <div>
                <div className='friend-name'>{props.friend?.displayName}</div>
                <div className='friend-code'>{props.friend?.code}</div>
            </div>
        </div>
    )
}

export default FriendsInfo
