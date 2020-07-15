import axios, { AxiosResponse } from 'axios'
import { ILoginFromValues, IUser, IRegisterFormValues } from '../../models/user'
import { IChannel } from '../../models/channel'

axios.defaults.baseURL = 'http://localhost:5000/api'

axios.interceptors.request.use(config => {
    const token = window.localStorage.getItem('jwt')
    if(token) config.headers.Authorization = `Bearer ${token}`
    return config
}, error => {
    return Promise.reject(error)
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
    currentUser: (): Promise<IUser> => request.get('/users')
}

const Channel = {
    list: (): Promise<IChannel[]> => request.get('channels'),
    add: (values: IChannel) => request.post('channels', values),
    delete: (id: string) => request.del(`channels/${id}`)
}

export default { User, Channel }