import { IFriend } from "./friend";

export interface IRequest {
    receivedRequests: IFriend[],
    sentRequests: IFriend[]
}