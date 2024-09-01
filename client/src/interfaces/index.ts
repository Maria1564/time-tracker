export interface IUser {
    id: number,
    login: string,
    email: string,
    token?: string
}

export interface IColors {
    id: number,
    hexcode: string,
    namecolor: string,  
}

export interface IActivity {
    id: number,
    nameActivity: string,
    hexcode: string
}