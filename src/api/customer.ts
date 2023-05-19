import { enumStatus } from '../configs/enum';
import { CustomerPayload, ICreateCustomerBody } from '@interfaces';
import { ApiClient } from './axiosClient';

export const customerAPI = {
  getList: (params: CustomerPayload) => {
    const url = '/customers';
    return ApiClient.get(url, { params });
  },

  getOne: (id: number | string) => {
    const url = `/customers/${id}`;
    return ApiClient.get(url);
  },

  create: (body: any) => {
    const url = '/customers';
    return ApiClient.post(url, body);
  },

  updateStatus: (id: number, body: { status: enumStatus }) => {
    const url = `/members/${id}`;
    return ApiClient.patch(url, body);
  },

  update: (id: number | string, body: any) => {
    const url = `/customers/${id}`;
    return ApiClient.patch(url, body);
  },

  delete: (id: string | number) => {
    const url = `/customers/${id}`;
    return ApiClient.delete(url);
  },
};
