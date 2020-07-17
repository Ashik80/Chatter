import React, { useContext, SyntheticEvent } from 'react'
import './Modal.css'
import { observer } from 'mobx-react-lite'
import { RootStoreContext } from '../../stores/rootStore'

const Modal = () => {
    const rootStore = useContext(RootStoreContext)
    const { closeModal, body } = rootStore.modalStore

    const anywhereClick = (e: SyntheticEvent<HTMLDivElement>) => {
        const { id } = e.currentTarget
        if (id === 'modal') {
            closeModal()
        }
    }

    return (
        <div className='modal' id='modal' onClick={anywhereClick}>
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