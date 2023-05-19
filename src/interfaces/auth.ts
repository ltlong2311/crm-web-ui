export interface ILoginFields {
  username: string;
  password: string;
}

export interface IRegisterFields {
  email: string;
  password: string;
  name: string;
  phone: string;
  theme_color?: string;
}

export interface ISendMailForgotFields {
  email: string;
  hash: string;
}

export interface IVerifyEmailFields {
  otp: string;
  hash: string;
}

export interface IResetPasswordFields {
  newPassword: string;
  hash: string;
}

export interface ILogoutFields {
  accessToken?: string;
}

export interface ILoginResFields {
  id: number;
  createdAt: number;
  updatedAt: number;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  forgotPasswordOtp: any;
  isForgotPassword: boolean;
  role: string;
  token: string;
}
export interface ColorTheme {
  color: string;
  font_size: number;
  logo: string;
}

export interface ICompany {
  id: number;
  name: string;
  announcements: string;
  customerUrl: string;
  isActiveTiers: boolean;
}

export interface IOwnerInfo {
  id: number;
  createdAt: string | number;
  updatedAt: string | number;
  username: string;
  name?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  forgotPasswordOtp: any;
  isForgotPassword: boolean;
  role: string;
  status: number;
  token: string;
  store: any;
  branch: ICompany;
}
