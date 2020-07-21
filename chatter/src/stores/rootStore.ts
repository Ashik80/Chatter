import ChannelStore from "./channelStore";
import { createContext } from "react";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import FriendStore from "./friendStore";
import MessageStore from "./messageStore";
import SelectionStore from "./selectionStore";

export class RootStore {
    channelStore: ChannelStore
    userStore: UserStore
    modalStore: ModalStore
    friendStore: FriendStore
    messageStore: MessageStore
    selectionStore: SelectionStore

    constructor() {
        this.channelStore = new ChannelStore(this)
        this.userStore = new UserStore(this)
        this.modalStore = new ModalStore(this)
        this.friendStore = new FriendStore(this)
        this.messageStore = new MessageStore(this)
        this.selectionStore = new SelectionStore(this)
    }
}

export const RootStoreContext = createContext(new RootStore())