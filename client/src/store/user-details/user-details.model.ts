export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}
export interface UserDetailsState {
    email: string;
    username: string;
    gender: Gender | undefined
    age: number;
}