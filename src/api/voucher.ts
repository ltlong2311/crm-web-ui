import { enumStatus } from '../configs/enum';
import { ApiClient } from './axiosClient';

export const voucherAPI = {
  getList: (params: any) => {
    const url = '/vouchers';
    return ApiClient.get(url, { params });
  },

  getOne: (id: number | string) => {
    const url = `/vouchers/${id}`;
    return ApiClient.get(url);
  },

  create: (body: any) => {
    const url = '/vouchers';
    return ApiClient.post(url, body);
  },

  updateStatus: (id: number, body: { status: enumStatus }) => {
    const url = `/vouchers/${id}`;
    return ApiClient.patch(url, body);
  },

  update: (id: number | string, body: any) => {
    const url = `/vouchers/${id}`;
    return ApiClient.patch(url, body);
  },

  delete: (id: string | number) => {
    const url = `/vouchers/${id}`;
    return ApiClient.delete(url);
  },
};
