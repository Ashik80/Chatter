import {observable, action} from 'mobx'
import { createContext } from 'react'

class ModalStore {
    @observable open = false
    @observable body = null

    @action openModal = (body: any) => {
        this.open = true
        this.body = body
    }

    @action closeModal = () => {
        this.open = false
        this.body = null
    }
}

export default createContext(new ModalStore())