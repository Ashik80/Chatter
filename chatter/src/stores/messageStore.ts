import { RootStore } from "./rootStore";
import { observable, action, runInAction, computed, values } from "mobx";
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

export default class MessageStore {
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }

    @observable.ref hubConnection: HubConnection | null = null

    @action createHubConnection = (id: string) => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl('http://localhost:5000/chat', {
                accessTokenFactory: () => this.rootStore.userStore.token!
            })
            .configureLogging(LogLevel.Information)
            .build()

        this.hubConnection.start()
            .then(() => console.log(this.hubConnection?.state))
            .then(() => {
                if (this.hubConnection?.state === 'Connected') {
                    this.hubConnection.invoke("AddToChannel", id)
                }
            })
            .catch(error => console.log('Error establishing connection', error))

        this.hubConnection.on('ReceiveMessageInChannel', message => {
            runInAction(() => {
                this.rootStore.channelStore.channel!.messages.push(message)
            })
        })

        this.hubConnection.on('RecieveMessageFromFriend', message => {
            runInAction(() => {
                this.rootStore.friendStore.friend!.messages.push(message)
            })
        })
    }

    @action stopConnection = () => {
        this.hubConnection?.stop()
    }

    @action sendMessageToChannel = async (values: any) => {
        values.id = this.rootStore.channelStore.channel!.id
        try {
            await this.hubConnection?.invoke('SendMessageToChannel', values)
        } catch (error) {
            console.log(error)
        }
    }

    @action sendMessageToFriend = async (values: any) => {
        values.id = this.rootStore.friendStore.friend!.id
        values.commonId = this.rootStore.friendStore.friend!.friendshipID
        try{
            await this.hubConnection?.invoke('SendMessageToFriend', values)
        } catch (error) {
            console.log(error)
        }
    }

    @computed get messagesByDate() {
        let messages
        if(this.rootStore.channelStore.channel !== null){
            messages = this.rootStore.channelStore.channel.messages.slice()
        }
        if(this.rootStore.friendStore.friend !== null){
            messages = this.rootStore.friendStore.friend.messages.slice()
        }
        messages = messages?.sort((a, b) =>
            Date.parse(a.sentTime) - Date.parse(b.sentTime)
        )
        return messages
    }
}