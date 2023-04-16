export interface IUserSession {
    access_token: string,
    refresh_token: string
}

export interface AuthState {
    userSession: IUserSession | null
}