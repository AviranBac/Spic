export interface IUserSession {
    access_token: string,
    refresh_token: string,
    email: string,
    username: string,
    gender: 'MALE' | 'FEMALE'
}

export interface AuthState {
    userSession: IUserSession | null
}