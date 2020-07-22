import { IChannel } from "../../../models/channel"
import { v4 as uuid } from 'uuid'
import { FORM_ERROR } from "final-form"

export const submitFormHandler = (
    values: any,
    header: string,
    addChannel: (values: IChannel) => Promise<void>,
    setInputMode: (value: React.SetStateAction<boolean>) => void,
    setChannelVisibility: (value: React.SetStateAction<boolean>) => void,
    setActive: (value: React.SetStateAction<boolean>) => void,
    addFriend: (code: string) => Promise<void>,
) => {
    if (header === 'channels') {
        const channel: IChannel = {
            ...values,
            id: uuid()
        }
        return addChannel(channel).then(() => {
            setInputMode(false)
            setChannelVisibility(true)
            setActive(true)
        })
    } else if (header === 'friends') {
        return addFriend(values).then(() => {
            setInputMode(false)
        })
    }
}