import {
  ILoginFields,
  ILogoutFields,
  IRegisterFields,
  IResetPasswordFields,
  ISendMailForgotFields,
  IVerifyEmailFields,
} from '@interfaces';
import axiosClient from './axiosClient';

export const authAPI = {
  login: (values: ILoginFields) => {
    const url = '/auth/login';
    return axiosClient.post(url, values);
  },
  register: (values: IRegisterFields) => {
    const url = '/auth/users/register';
    return axiosClient.post(url, values);
  },
  forgotPassword: (values: ISendMailForgotFields) => {
    const url = '/users/forgot-password';
    return axiosClient.post(url, values);
  },
  verifyEmail: (values?: IVerifyEmailFields) => {
    const url = '/users/confirm-forgot-password';
    return axiosClient.post(url, values);
  },
  resetPassword: (values?: IResetPasswordFields) => {
    const url = '/auth/users/reset-password';
    return axiosClient.post(url, values);
  },
  logout: (values?: ILogoutFields) => {
    const url = '/auth/logout';
    return axiosClient.post(url, values);
  },
};
