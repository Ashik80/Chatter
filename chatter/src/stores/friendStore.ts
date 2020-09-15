import { RootStore } from "./rootStore";
import { observable, action, runInAction } from "mobx";
import { IFriend } from "../models/friend";
import agent from "../App/api/agent";
import { IRequest } from "../models/request";

export default class FriendStore {
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore
    }

    @observable friends: IFriend[] = []
    @observable friend: IFriend | null = null
    @observable requests: IRequest | null = null
    @observable sent = false

    @action loadFriends = async () => {
        try {
            const friends = await agent.Friend.list()
            runInAction(() => {
                this.friends = friends
            })
        } catch (error) {
            console.log(error)
        }
    }

    @action addFriend = async (code: string) => {
        this.sent = false
        try {
            await agent.Friend.add(code)
            runInAction(() => {
                this.sent = true
                setTimeout(() => runInAction(() => this.sent = false), 2000);
            })
        } catch (error) {
            throw error
        }
    }

    @action listRequests = async (predicate: string) => {
        try {
            const requests = await agent.Friend.listRequest(predicate)
            runInAction(() => {
                this.requests = requests
            })
        } catch (error) {
            console.log(error)
        }
    }

    @action acceptRequest = async (friend: IFriend) => {
        try {
            console.log(friend.id)
            await agent.Friend.accept(friend.id)
            runInAction(() => {
                this.requests!.receivedRequests = this.requests!.receivedRequests.filter(x => x !== friend)
                this.friends.push(friend)
            })
        } catch (error) {
            console.log(error)
        }
    }

    @action deleteRequest = async (id: string, predicate: string) => {
        try {
            await agent.Friend.delete(id, predicate)
            runInAction(() => {
                this.friends = this.friends.filter(friend => friend.id !== id)
                if(predicate === 'sent'){
                    this.requests!.sentRequests = this.requests!.sentRequests.filter(req => req.id !== id)
                } else if (predicate === 'received') {
                    this.requests!.receivedRequests = this.requests!.receivedRequests.filter(r => r.id !== id)
                }
            })
        } catch(error) {
            console.log(error)
        }
    }

    @action unfriend = async (id: string) =>  {
        try{
            await agent.Friend.unfriend(id)
            runInAction(() => {
                this.friends = this.friends.filter(friend => friend.id !== id)
            })
        } catch (error) {
            console.log(error)
        }
    }

    @action friendDetails = async (id: string) => {
        this.rootStore.channelStore.channel = null
        try{
            const friend = await agent.Friend.details(id)
            runInAction(() => {
                this.friend = friend
            })
        } catch (error) {
            console.log(error)
        }
    }
}