export interface IFindUserBy {
  id?: string;
  email?: string;
  code?: string;
}

export interface IUser {
  email: string;
  password: string;
  code: string;
}
