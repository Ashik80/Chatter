import axios, { AxiosResponse } from 'axios'
import { ILoginFromValues, IUser, IRegisterFormValues } from '../../models/user'
import { IChannel, IChannelFormValues } from '../../models/channel'
import { IFriend } from '../../models/friend'
import { IRequest } from '../../models/request'
import { toast } from 'react-toastify'

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.request.use(config => {
    const token = window.localStorage.getItem('jwt')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
}, error => {
    return Promise.reject(error)
})

axios.interceptors.response.use(undefined, error => {
    if (error.message === 'Network Error' && !error.response) {
        toast.error(`🚫 Network Error - please try again later`)
    }
    const { status, config, data } = error.response
    if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
        toast.error('Not Found')
    }
    if (status === 404) {
        Object.values(data.errors).flat().map(err => 
            toast.error(`${Object.keys(data.errors)} ${err}`))
    }
    if (status === 500) {
        toast.error("🚫 Server Error")
    }
    throw error.response
})

const responseBody = (response: AxiosResponse) => response.data

const request = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody)
}

const User = {
    login: (values: ILoginFromValues): Promise<IUser> => request.post('users/login', values),
    register: (values: IRegisterFormValues) => request.post('users/register', values),
    currentUser: (): Promise<IUser> => request.get('users')
}

const Channel = {
    list: (): Promise<IChannel[]> => request.get('channels'),
    add: (values: IChannel) => request.post('channels', values),
    delete: (id: string) => request.del(`channels/${id}`),
    edit: (id: string, value: IChannelFormValues) => request.put(`channels/${id}`, value),
    addUser: (id: string, userId: string) => request.post(`channels/add/${id}/${userId}`, {}),
    details: (id: string): Promise<IChannel> => request.get(`channels/${id}`)
}

const Friend = {
    list: (): Promise<IFriend[]> => request.get('friends'),
    add: (code: string) => request.post('friends', code),
    listRequest: (predicate: string): Promise<IRequest> =>
        request.get(`friends/requests?predicate=${predicate}`),
    accept: (id: string) => request.post(`friends/${id}`, {}),
    delete: (id: string, predicate: string) => request.del(`friends/requests/${id}?predicate=${predicate}`),
    unfriend: (id: string) => request.del(`friends/${id}`)
}

export default { User, Channel, Friend }