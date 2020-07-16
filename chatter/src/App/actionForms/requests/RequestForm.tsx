import React, { useContext, useEffect, useState, SyntheticEvent } from 'react'
import RequestNav from './RequestNav'
import FriendList from '../../sideBar/contacts/FriendList'
import { RootStoreContext } from '../../../stores/rootStore'
import { observer } from 'mobx-react-lite'

const RequestForm = () => {
    const rootUser = useContext(RootStoreContext)
    const {listRequests, requests, acceptRequest, deleteRequest} = rootUser.friendStore

    const [tab, setTab] = useState('received')

    const tabHandle = (e: SyntheticEvent<HTMLDivElement>) => {
        const {id} = e.currentTarget
        setTab(id)
    }

    useEffect(() => {
        listRequests(tab)
    },[listRequests, tab])

    return (
        <div className='action-form'>
            <RequestNav tab={tab} tabHandle={tabHandle} />
            {tab === 'received' && 
                <FriendList
                    predicate={tab}
                    accept={acceptRequest}
                    deleted={deleteRequest}
                    friends={requests?.receivedRequests}
                    request
                />
            }
            {tab === 'sent' && 
                <FriendList
                    predicate={tab}
                    deleted={deleteRequest}
                    friends={requests?.sentRequests}
                    request
                />
            }
        </div>
    )
}

export default observer(RequestForm)