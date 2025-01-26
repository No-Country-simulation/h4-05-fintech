export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IResetPasswordQuery {
  code: string | null;
  exp: string | null;
}

export interface IResetPassword {
  newPassword: string;
  confirmPassword: string;
}