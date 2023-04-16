export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}
export interface UserDetailsState {
    email: string;
    username: string;
    gender: Gender | string;
    age: number;
}