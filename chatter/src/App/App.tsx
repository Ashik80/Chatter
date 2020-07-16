import React, { useContext, useEffect } from 'react'
import Messenger from './main/Messenger'
import LandingPage from './main/LandingPage'
import GetStarted from './main/GetStarted'
import { Route } from 'react-router-dom'
import Modal from './modal/Modal'
import { observer } from 'mobx-react-lite'
import 'mobx-react-lite/batchingForReactDom'
import { history } from '..'
import { RootStoreContext } from '../stores/rootStore'

const App = () => {
    const rootStore = useContext(RootStoreContext)
    const {currentUser, getToken} = rootStore.userStore
    const {open} = rootStore.modalStore

    useEffect(() => {
        if(getToken) currentUser().finally(() => history.push('/messenger'))
    }, [currentUser, getToken])

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
