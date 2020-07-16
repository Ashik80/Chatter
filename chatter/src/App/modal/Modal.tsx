import React, { useContext, SyntheticEvent } from 'react'
import './Modal.css'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../stores/rootStore'

interface IProps {
    isOpen: boolean
}

const Modal: React.FC<IProps> = ({ isOpen }) => {
    const rootStore = useContext(RootStoreContext)
    const { closeModal, body } = rootStore.modalStore

    const displayStyle = {
        display: isOpen ? 'block' : 'none'
    }

    const anywhereClick = (e: SyntheticEvent<HTMLDivElement>) => {
        const { id } = e.currentTarget
        if (id === 'modal') {
            closeModal()
        }
    }

    return (
        <div className='modal' id='modal' style={displayStyle} onClick={anywhereClick}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                <span className='close' onClick={closeModal}>
                    &times;
                </span>
                {body}
            </div>
        </div>
    )
}

export default observer(Modal)