import { observable, action, runInAction, configure, computed } from "mobx";
import { IUser, ILoginFromValues, IRegisterFormValues } from "../models/user";
import agent from "../App/api/agent";
import { history } from "..";
import { RootStore } from "./rootStore";
import { toast } from "react-toastify";

configure({ enforceActions: 'always' })

export default class UserStore {
    rootStore: RootStore
    constructor(rootStore: RootStore){
        this.rootStore = rootStore
    }

    @observable user: IUser | null = null
    @observable token: string | null = null

    @computed get getToken() {
        return window.localStorage.getItem('jwt')
    }

    @computed get isLoggedIn() {
        return !!this.user
    }

    @action setToken = (token: string | null) => {
        window.localStorage.setItem('jwt', token!)
        this.token = token
    }

    @action login = async (values: ILoginFromValues) => {
        try {
            const user = await agent.User.login(values)
            runInAction(() => {
                this.user = user
                this.setToken(user.token)
                this.rootStore.modalStore.closeModal()
                history.push('/messenger')
            })
        } catch (error) {
            throw error
        }
    }

    @action register = async (values: IRegisterFormValues) => {
        try{
            const user = await agent.User.register(values)
            runInAction(() => {
                this.user = user
                this.setToken(user.token)
                this.rootStore.modalStore.closeModal()
                history.push('/messenger')
            })
        } catch(error){
            throw error
        }
    }

    @action currentUser = async () => {
        try {
            const user = await agent.User.currentUser()
            runInAction(() => {
                this.user = user
                this.setToken(user.token)
            })
        } catch (error) {
            toast.error('🚫 Unauthorized access not allowec')
            history.push('/')
            console.log(error)
        }
    }

    @action logout = () => {
        this.rootStore.messageStore.stopConnection()
        this.user = null
        this.rootStore.channelStore.channel = null
        window.localStorage.removeItem('jwt')
        history.push('/')
    }
}