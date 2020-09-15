import { IMessage } from "./message";

export interface IFriend {
    id: string,
    displayName: string,
    code: string,
    image?: string,
    friendshipID: string,
    messages: IMessage[]
}