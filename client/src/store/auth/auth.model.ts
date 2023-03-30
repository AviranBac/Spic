export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export interface IUserSession {
    access_token: string,
    refresh_token: string,
    email: string,
    username: string,
    gender: Gender
}

export interface AuthState {
    userSession: IUserSession | null
}