export interface IUser {
    id: string,
    displayName: string,
    userName: string,
    token: string,
    code: string,
    image?: string
}

export interface ILoginFromValues {
    email: string,
    password: string
}

export interface IRegisterFormValues extends ILoginFromValues {
    displayName: string,
    userName: string
}