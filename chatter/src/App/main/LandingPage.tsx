import React, { useEffect, useContext } from 'react'
import NavBar from '../navbar/NavBar'
import LandingContent from '../landingContent/LandingContent'
import './LandingPage.css'
import UserStore from '../../stores/userStore'
import { history } from '../..'

const LandingPage = () => {
    const userStore = useContext(UserStore)
    const {currentUser, token} = userStore

    useEffect(() => {
        if(token) currentUser().finally(() => history.push('/messenger'))
    }, [currentUser, token])
    
    return (
        <div className='landing-page'>
            <NavBar />
            <LandingContent  />
        </div>
    )
}

export default LandingPage