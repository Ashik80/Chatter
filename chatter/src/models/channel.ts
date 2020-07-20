import { IMessage } from "./message";

export interface IChannel {
    id: string,
    name: string,
    isAdmin: boolean,
    messages: IMessage[]
}

export interface IChannelFormValues {
    name: string
}