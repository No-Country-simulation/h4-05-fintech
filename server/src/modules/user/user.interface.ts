export interface IFindUserBy {
  id?: string;
  email?: string;
  verificationCode?: string;
  resetPasswordCode?: string;
}

export interface ICreateUser {
  email: string;
  password?: string;
  verificationCode?: string;
  verified?: boolean;
}
