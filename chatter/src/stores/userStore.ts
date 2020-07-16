import { observable, action, runInAction, configure, computed } from "mobx";
import { IUser, ILoginFromValues, IRegisterFormValues } from "../models/user";
import agent from "../App/api/agent";
import { history } from "..";
import { RootStore } from "./rootStore";

configure({ enforceActions: 'always' })

export default class UserStore {
    rootStore: RootStore
    constructor(rootStore: RootStore){
        this.rootStore = rootStore
    }

    @observable user: IUser | null = null
    @observable loading = false

    @computed get getToken() {
        return window.localStorage.getItem('jwt')
    }

    @computed get isLoggedIn() {
        return !!this.user
    }

    @action login = async (values: ILoginFromValues) => {
        this.loading = true
        try {
            const user = await agent.User.login(values)
            runInAction(() => {
                this.user = user
                window.localStorage.setItem('jwt', this.user.token)
                history.push('/messenger')
            })
        } catch (error) {
            console.log(error)
        } finally {
            runInAction(() => {
                this.loading = false
            })
        }
    }

    @action register = async (values: IRegisterFormValues) => {
        this.loading = true
        try{
            const user = await agent.User.register(values)
            runInAction(() => {
                this.user = user
                window.localStorage.setItem('jwt', this.user!.token)
                history.push('/messenger')
            })
        } catch(error){
            console.log(error)
        } finally {
            runInAction(() => {
                this.loading = false
            })
        }
    }

    @action currentUser = async () => {
        try {
            const user = await agent.User.currentUser()
            runInAction(() => {
                this.user = user
                window.localStorage.setItem('jwt', this.user.token)
            })
        } catch (error) {
            console.log(error)
        }
    }

    @action logout = () => {
        this.user = null
        window.localStorage.removeItem('jwt')
        history.push('/')
    }
}