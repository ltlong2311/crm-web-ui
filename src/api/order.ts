import { enumStatus } from '../configs/enum';
import { CustomerPayload, ICreateCustomerBody } from '@interfaces';
import { ApiClient } from './axiosClient';

export const orderAPI = {
  getList: (params: CustomerPayload) => {
    const url = '/orders';
    return ApiClient.get(url, { params });
  },

  getOne: (id: number | string) => {
    const url = `/orders/${id}`;
    return ApiClient.get(url);
  },

  create: (body: any) => {
    const url = '/orders';
    return ApiClient.post(url, body);
  },

  updateStatus: (id: number, body: { status: enumStatus }) => {
    const url = `/orders/${id}`;
    return ApiClient.patch(url, body);
  },

  update: (id: number | string, body: any) => {
    const url = `/orders/${id}`;
    return ApiClient.patch(url, body);
  },

  delete: (id: string | number) => {
    const url = `/orders/${id}`;
    return ApiClient.delete(url);
  },
};
