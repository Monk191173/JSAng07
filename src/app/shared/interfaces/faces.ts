export interface IcurUser {
  login: string,
  password: string,
  email: string,
  id?:number
}

export interface IcurMessage {
  userID: number,
  dateTime: Date,
  title: string,
  message: string,
  id?:number
}