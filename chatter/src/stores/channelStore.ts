import { observable, action, runInAction } from "mobx";
import { createContext } from "react";
import { IChannel } from "../models/channel";
import agent from "../App/api/agent";
import {v4 as uuid} from 'uuid'

class ChannelStore {
    @observable channels: IChannel[] = []

    @action addChannel = async (values: IChannel) => {
        const channel: IChannel = {
            id: uuid(),
            name: `#${values.name}`
        }
        try{
            await agent.Channel.add(values)
            runInAction(() => {
                this.channels.push(channel)
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

export default createContext(new ChannelStore())