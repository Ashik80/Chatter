export interface IMessage {
    id: string,
    text: string,
    sentTime: string,
    userId: string,
    displayName: string,
    image?: string
}

export interface IMessageSendValues {
    id: string,
    text: string
}