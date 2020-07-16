import React, { useContext } from 'react'
import './DropdownMenu.css'
import { RootStoreContext } from '../../../stores/rootStore'
import RequestForm from '../../actionForms/requests/RequestForm'

interface IProps {
    logout: () => void,
    clickHandle: () => void
}

const DropdownMenu: React.FC<IProps> = ({ logout, clickHandle }) => {
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
                <div className='dropdown-item' onClick={requestHandle} >Requests</div>
                <div className='dropdown-item' onClick={() => logout()}>Logout</div>
            </div>
        </div>
    )
}

export default DropdownMenu