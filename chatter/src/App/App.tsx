import React from 'react'
import Messenger from './main/Messenger'
import LandingPage from './main/LandingPage'
import GetStarted from './main/GetStarted'
import { Route } from 'react-router-dom'

const App = () => {
    return (
        <div className='app'>
            <Route exact path='/' component={LandingPage} />
            <Route path='/get-started' component={GetStarted} />
            <Route path='/messenger' component={Messenger} />
        </div>
    )
}

export default App
