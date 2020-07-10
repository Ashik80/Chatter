import React, { useContext } from 'react'
import Messenger from './main/Messenger'
import LandingPage from './main/LandingPage'
import GetStarted from './main/GetStarted'
import { Route } from 'react-router-dom'
import Modal from './modal/Modal'
import ModalStore from '../stores/modalStore'
import { observer } from 'mobx-react-lite'
import 'mobx-react-lite/batchingForReactDom'

const App = () => {
    const modalStore = useContext(ModalStore)
    const {open} = modalStore

    return (
        <div className='app'>
            <Modal isOpen={open} />
            <Route exact path='/' component={LandingPage} />
            <Route path='/get-started' component={GetStarted} />
            <Route path='/messenger' component={Messenger} />
        </div>
    )
}

export default observer(App)
