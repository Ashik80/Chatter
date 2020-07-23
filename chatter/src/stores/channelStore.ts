import { observable, action, runInAction, computed } from "mobx";
import { IChannel, IChannelFormValues } from "../models/channel";
import agent from "../App/api/agent";
import { RootStore } from "./rootStore";
import { toast } from "react-toastify";

export default class ChannelStore {
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }

    @observable channels: IChannel[] = []
    @observable channel: IChannel | null = null
    @observable added = false

    @computed get userChannels(){
        let channel = this.channels.filter(x => x.isAdmin)
        return channel
    }

    @action addChannel = async (values: IChannel) => {
        try {
            await agent.Channel.add(values)
            runInAction(() => {
                values.name = '#' + values.name
                values.isAdmin = true
                this.channels.push(values)
            })
        } catch (error) {
            console.log(error)
        }
    }

    @action listChannels = async () => {
        try {
            const channels = await agent.Channel.list()
            runInAction(() => {
                this.channels = channels
            })
        } catch (error) {
            console.log(error)
        }
    }

    @action editChannel = async (values: IChannel) => {
        const formValues: IChannelFormValues = {
            name: values.name
        }
        try {
            await agent.Channel.edit(values.id, formValues)
            runInAction(() => {
                let channel = this.channels.filter(x => x.id === values.id)[0]
                let index = this.channels.indexOf(channel)
                values.name = '#' + values.name
                values.isAdmin = true
                this.channels[index] = values
            })
        } catch (error) {
            console.log(error)
        }
    }

    @action deleteChannel = async (id: string) => {
        try {
            await agent.Channel.delete(id)
            runInAction(() => {
                this.channels = this.channels.filter(channel => channel.id !== id)
            })
        } catch (error) {
            console.log(error)
        }
    }

    @action addUser = async (id: string, userId: string) => {
        this.added = false
        try {
            await agent.Channel.addUser(id, userId)
            runInAction(() => {
                this.added = true
                setTimeout(() => runInAction(() => this.added = false), 2000)
            })
        } catch (error) {
            Object.values(error.data.errors).flat().map((err) => 
                toast.error(`${Object.keys(error.data.errors)} ${err}`)
            )
        }
    }

    @action channelDetails = async (id: string) => {
        this.rootStore.friendStore.friend = null
        try {
            const channel = await agent.Channel.details(id)
            runInAction(() => {
                this.channel = channel
            })
        } catch (error) {
            console.log(error)
        }
    }
}