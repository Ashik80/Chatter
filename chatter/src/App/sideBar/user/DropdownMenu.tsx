import React, { useContext } from 'react'
import './DropdownMenu.css'
import { RootStoreContext } from '../../../stores/rootStore'
import RequestForm from '../../actionForms/requests/RequestForm'
import { IRequest } from '../../../models/request'

interface IProps {
    logout: () => void,
    clickHandle: () => void,
    requests: IRequest | null
}

const DropdownMenu: React.FC<IProps> = ({ logout, clickHandle, requests }) => {
    const rootStore = useContext(RootStoreContext)
    const { openModal } = rootStore.modalStore

    const requestHandle = () => {
        openModal(<RequestForm />)
        clickHandle()
    }

    return (
        <div className='dropdown-wrap'>
            <div className='dropdown-pointer' />
            <div className='dropdown-menu'>
                <div className='dropdown-item' onClick={requestHandle} >
                    {requests !== null && requests.receivedRequests !== null && 
                        requests.receivedRequests.length > 0 &&
                        <div className='dropdown-notification'>{requests.receivedRequests.length}</div>
                    }
                    Requests
                </div>
                <div className='dropdown-item' onClick={() => logout()}>Logout</div>
            </div>
        </div>
    )
}

export default DropdownMenu