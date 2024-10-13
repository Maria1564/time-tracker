export interface IUser {
    id: number,
    login: string,
    email: string,
    token?: string,
    pathAvatar?: string
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

export interface IActivityWithTime extends IActivity {
    startTime: string, 
    endTime: string
}

export type logActivities = Omit<IActivity, "id"> & { minutes: string|number, seconds: string|number }

export interface IDataActivities {
    [key: string]: {
      color?: string
      week?: Array<{[key: string]: {minutes: number | string, seconds: number| string}}>
    }
  }