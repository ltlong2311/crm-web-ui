import { enumRole } from '@configs';
import { IGetListParams } from './app';

export interface IGetAccountListParams extends IGetListParams {
  role?: enumRole;
}

export interface IUserAccount {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  forgotPasswordOtp: any;
  isForgotPassword: boolean;
  role?: enumRole;
}
