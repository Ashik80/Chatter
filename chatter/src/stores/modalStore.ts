import { observable, action } from 'mobx'
import { RootStore } from './rootStore'

export default class ModalStore {
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }

    @observable open = false
    @observable body: JSX.Element | null = null
    @observable show = false

    @action openModal = (body: JSX.Element) => {
        this.open = true
        this.body = body
    }

    @action closeModal = () => {
        this.open = false
        this.body = null
    }
}