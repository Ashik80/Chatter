import React, { useContext, SyntheticEvent } from 'react'
import './Modal.css'
import ModalStore from '../../stores/modalStore'
import { observer } from 'mobx-react-lite'

interface IProps {
    isOpen: boolean
}

const Modal: React.FC<IProps> = ({ isOpen }) => {
    const modalStore = useContext(ModalStore)
    const { closeModal, body } = modalStore

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