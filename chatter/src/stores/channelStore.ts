import { observable, action, runInAction } from "mobx";
import { IChannel, IChannelFormValues } from "../models/channel";
import agent from "../App/api/agent";
import { RootStore } from "./rootStore";

export default class ChannelStore {
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }

    @observable channels: IChannel[] = []
    @observable channel: IChannel | null = null

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
        try {
            await agent.Channel.addUser(id, userId)
        } catch (error) {
            console.log(error)
        }
    }

    @action channelDetails = async (id: string) => {
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