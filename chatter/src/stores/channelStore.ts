import { observable, action, runInAction } from "mobx";
import { IChannel } from "../models/channel";
import agent from "../App/api/agent";
import { RootStore } from "./rootStore";

export default class ChannelStore {
    rootStore: RootStore
    constructor(rootStore: RootStore)
    {
        this.rootStore = rootStore
    }

    @observable channels: IChannel[] = []

    @action addChannel = async (values: IChannel) => {
        try{
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
        try{
            const channels = await agent.Channel.list()
            runInAction(() => {
                this.channels = channels
            })
        } catch (error) {
            console.log(error)
        }
    }

    @action deleteChannel = async (id: string) => {
        try{
            await agent.Channel.delete(id)
            runInAction(() => {
                this.channels = this.channels.filter(channel => channel.id !== id)
            })
        } catch (error) {
            console.log(error)
        }
    }
}