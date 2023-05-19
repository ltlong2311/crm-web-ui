import { enumStatus } from '@configs';
import { IGetAccountListParams } from '@interfaces';
import { ApiClient } from './axiosClient';

export const userAPI = {
  getAccountList: (params: IGetAccountListParams) => {
    const url = `/users`;
    return ApiClient.get(url, {params});
  },

  getOne: (id: number | string) => {
    const url = `/users/${id}`;
    return ApiClient.get(url);
  },

  create: (body: any) => {
    const url = '/users';
    return ApiClient.post(url, body);
  },

  updateStatus: (id: number, body: { status: enumStatus }) => {
    const url = `/users/${id}`;
    return ApiClient.patch(url, body);
  },

  update: (id: number | string, body: any) => {
    const url = `/users/${id}`;
    return ApiClient.patch(url, body);
  },

  delete: (id: number | string) => {
    const url = `/users/${id}`;
    return ApiClient.delete(url);
  },
};
